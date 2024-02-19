import { Injectable } from '@nestjs/common';
import axios from 'axios';
import fetch from "cross-fetch";
import * as fs from 'fs';
import * as path from 'path';
import * as deepl from 'deepl-node';
import { ColorsService } from 'src/color/color.service';

const translator = new deepl.Translator('deeed8fc-5c20-4939-8a3a-08508721a18a:fx')
@Injectable()
export class ReplicantService {
  constructor(private colorsService: ColorsService) {}

  async getTagsFromImage(){
    const Replicate = require("replicate");
    const replicate = new Replicate({
      auth: 'r8_Qa1XdAS005a5a1HfXC0C5Hh6R0i0GZd31mrKa',
      fetch: fetch,
    });
    const predictions = [];
    const fs = require("node:fs/promises");
    const folders = await this.getFirstImagePaths('C:/xampp/htdocs/promoselect-web/image/catalog/promoselect');
    for (const folder of folders) {
      // Read the file into a buffer
      const data = await fs.readFile(folder);
      // // Convert the buffer into a base64-encoded string
      const base64 = data.toString("base64");
      let ext = path.extname(folder).toLowerCase();
      ext = ext.replace('.', '');
      // // // Set MIME type for PNG image
      const mimeType = 'image/' + ext;
      // // // Create the data URI
      const dataURI = `data:${mimeType};base64,${base64}`;
      let prediction = await replicate.deployments.predictions.create(
        "promoselect",
        "tag-generator",
        {
          input: {
            input_image: dataURI
          }
        }
      );
      prediction = await replicate.wait(prediction);
      const result = {
        image: folder,
        tags: prediction.output
      }
      predictions.push(result);
    }
    return predictions
  }

  async getFirstImagePaths(directoryPath: string, maxDepth: number = 100): Promise<string[]> {
    const imagePaths: string[] = [];
    await this.traverseDirectory(directoryPath, 0, maxDepth, imagePaths);
    return imagePaths;
  }

  private async traverseDirectory(directoryPath: string, currentDepth: number, maxDepth: number, imagePaths: string[]) {
    if (currentDepth >= maxDepth) {
      return;
    }

    const files = fs.readdirSync(directoryPath);
    for (const file of files) {
      const filePath = path.join(directoryPath, file);
      const stats = fs.statSync(filePath);
      if (stats.isDirectory()) {
        await this.traverseDirectory(filePath, currentDepth + 1, maxDepth, imagePaths);
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

  async separateTagsAndColors(){
    const response = "armchair, blanket, lamp, carpet, couch, dog, floor, furniture, gray, green, living room, picture frame, pillow, plant, room, sit, stool, wood floor"
    const traslatedTags = await translator.translateText(response, 'en', 'es')
    const responseTags = traslatedTags.text.split(', ')

    const colors = await this.colorsService.findAll()
    const colorFilters = []
    for (const color of colors) {
      colorFilters.push(color.name)
    }
    console.log(colorFilters)
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