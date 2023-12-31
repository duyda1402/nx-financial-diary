import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Request,
  Get,
  Param,
  Res,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import * as fs from "fs";
import { AuthGuard } from "../auth/guard/auth.guard";
import { AssetService } from "./asset.service";
import { UploadDto } from "./dto/upload.dto";
import { AssetTaxonomy } from "./enum/asset-taxonomy.enum";
import { join, extname } from "path";
import { generateUUID } from "../../utils";
import { ApiResponse } from "../../common/api.response";
import type { Response } from "express";

@Controller("assets")
export class AssetController {
  constructor(private readonly assetService: AssetService) {}

  @Post("upload")
  @UseGuards(AuthGuard)
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const taxonomy = req?.body?.taxonomy || AssetTaxonomy.OTHER;
          const uploadPath = `./apps/api-core/src/assets/${taxonomy}`;
          if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
          }
          cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
          const taxonomy = req?.body?.taxonomy || AssetTaxonomy.OTHER;
          const uniqueSuffix = generateUUID();
          const fileExtName = extname(file.originalname);
          const fileName = `${taxonomy}-${uniqueSuffix}${fileExtName}`;
          cb(null, fileName);
        },
      }),
      fileFilter: (req, file, cb) => {
        const allowedMimeTypes = ["image/jpeg", "image/png"];
        if (!allowedMimeTypes.includes(file.mimetype)) {
          return cb(new BadRequestException("Invalid file type (.jpg,.png)."), false);
        }
        cb(null, true);
      },
    }),
  )
  async uploadAsset(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
    @Body() body: UploadDto,
  ): Promise<any> {
    const userId = req["user"]?.sub;
    if (!file) {
      throw new BadRequestException("File is missing");
    }
    try {
      const { taxonomy = AssetTaxonomy.OTHER } = body;

      const path = file.filename;
      const asset = await this.assetService.createAsset({ path, taxonomy, userId });
      return ApiResponse.success(asset);
    } catch (err: any) {
      throw new BadRequestException(err.message);
    }
  }

  @Get("public/:filename")
  async getAsset(@Param("filename") filename: string, @Res() res: Response) {
    // Set content type of response
    const prefix = filename.split("-")[0] || "other";
    res.set("Content-Type", "image/jpeg");
    // Return image file
    res.sendFile(join(__dirname, "..", "api-core/assets/" + prefix, filename));
  }

  @Get("taxonomy/:taxonomy")
  async getAssetByTaxonomySystem(@Param("taxonomy") taxonomy: AssetTaxonomy) {
    try {
      return ApiResponse.success(await this.assetService.getAssetByTaxonomySystem(taxonomy));
    } catch (err: any) {
      throw new BadRequestException(`Invalid input value for enum: 'background','avatar','wallet' or 'category'`);
    }
  }
}
