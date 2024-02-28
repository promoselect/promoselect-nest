import { Injectable } from '@nestjs/common';
import fetch from 'cross-fetch';
import * as path from 'path';
import * as deepl from 'deepl-node';
import { ColorsService } from 'src/color/color.service';
import Replicate from 'replicate';
import fs from 'node:fs/promises';
import { ConfigService } from '@nestjs/config';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class ReplicantService {
  private translator: deepl.Translator;
  constructor(
    private colorsService: ColorsService,
    private configService: ConfigService,
    private productService: ProductService,
  ) {
    this.translator = new deepl.Translator(configService.get('DEEPL_API_KEY'));
  }

  async getTagsFromImage() {
    const replicate = new Replicate({
      auth: process.env.REPLICATE_AUTH_KEY,
      fetch: fetch,
    });
    const predictions = [];
    const folders = await this.getFirstImagePaths(process.env.IMAGE_PATH);
    for (const folder of folders) {
      // Read the file into a buffer
      const data = await fs.readFile(folder);
      // Convert the buffer into a base64-encoded string
      const base64 = data.toString('base64');
      let ext = path.extname(folder).toLowerCase();
      ext = ext.replace('.', '');
      // Set MIME type for PNG image
      const mimeType = 'image/' + ext;
      // Create the data URI
      const dataURI = `data:${mimeType};base64,${base64}`;
      let prediction = await replicate.deployments.predictions.create(
        'promoselect',
        'tag-generator',
        {
          input: {
            input_image: dataURI,
          },
        },
      );
      prediction = await replicate.wait(prediction);
      const result = {
        image: folder,
        tags: prediction.output,
      };
      predictions.push(result);
    }
    return predictions;
  }

  async getFirstImagePaths(
    directoryPath: string,
    maxDepth: number = 100,
  ): Promise<string[]> {
    const imagePaths: string[] = [];
    await this.traverseDirectory(directoryPath, 0, maxDepth, imagePaths);
    return imagePaths;
  }

  private async traverseDirectory(
    directoryPath: string,
    currentDepth: number,
    maxDepth: number,
    imagePaths: string[],
  ) {
    if (currentDepth >= maxDepth) {
      return;
    }
    const files = await fs.readdir(directoryPath);
    for (const file of files) {
      const filePath = path.join(directoryPath, file);
      const stats = await fs.stat(filePath);
      if (stats.isDirectory()) {
        await this.traverseDirectory(
          filePath,
          currentDepth + 1,
          maxDepth,
          imagePaths,
        );
      } else if (this.isImageFile(file)) {
        imagePaths.push(filePath);
        return;
      }
    }
  }

  private isImageFile(filename: string): boolean {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
    const ext = path.extname(filename).toLowerCase();
    return imageExtensions.includes(ext);
  }

  async separateTagsAndColors() {
    // const response =
    //   'armchair, blanket, lamp, carpet, couch, dog, floor, furniture, gray, green, living room, picture frame, pillow, plant, room, sit, stool, wood floor';
    // const traslatedTags = await this.translator.translateText(
    //   response,
    //   'en',
    //   'es',
    // );
    // const responseTags = traslatedTags.text.split(', ');
    // console.log(responseTags);
    // const colors = await this.colorsService.findAll();
    // const colorFilters = [];
    // for (const color of colors) {
    //   colorFilters.push(color.name);
    // }
    const product = await this.productService.findOneBySku("T172");
    console.log(product);
    //   console.log(colorFilters);
    //   //De la variable responseTags, verifica que colores aparecen en el arreglo de color filters, separalos en un arreglo de colores y los tags en un arreglo propio de tags
    //   const tags = []
    //   for (const tag of responseTags) {
    //     if (colorFilters.includes(tag)) {<
    //       colors.push(tag)
    //     } else {
    //       tags.push(tag)
    //     }
    //   }
    //   return {colors, tags}
  }
}

// product_attribute
// oc_attribute
// oc_attribute_group
// oc_language
