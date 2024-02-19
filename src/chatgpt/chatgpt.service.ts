import { Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';
import * as fs from 'fs';
import * as path from 'path';

const openai = new OpenAI({
    organization: "org-rdJ7kzVXv2IV6Ak9imIOXe3E",
    apiKey: "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"
});

@Injectable()
export class ChatgptService {
    async generateInfoFromImage(){
        const fs = require("node:fs/promises");

        const folders = await this.getFirstImagePaths('C:/xampp/htdocs/promoselect-web/image/catalog/promoselect');
        const images = [];
        for (const folder of folders) {
            console.log(folder);
            // Read the file into a buffer
            const data = await fs.readFile(folder);
            // Convert the buffer into a base64-encoded string
            const base64 = data.toString("base64");
            if(base64.length <= 0)
                continue;
            let ext = path.extname(folder).toLowerCase();
            ext = ext.replace('.', '');
            // Set MIME type for PNG image
            const mimeType = 'image/' + ext;
            // Create the data URI
            const dataURI = `data:${mimeType};base64,${base64}`;
            // const promptObject = {
            //     type: "image_url", 
            //     image_url: {
            //         "url": dataURI,
            //     },
            // };
            // images.push(promptObject);
            const response = await openai.chat.completions.create({
                model: "gpt-4-vision-preview",
                messages:[
                    {
                        role:"user",
                        content: [
                            {type: "text", text: "De la imagen proporcionada a continuacion genera en español:\n 1.- Tags para SEO \n2.- Dime el color del objeto y su codigo hexadecimal\n Responde con el siguiente formato: \n{'tags': 'tag1, tag2, tag3', 'color': {'nombre': 'color', 'codigo': '#ffffff'}}"},
                            {
                                type: "image_url", 
                                image_url: {
                                    "url": dataURI,
                                } 
                            },
                        ],
                    }
                ],
                "max_tokens": 300
            });
            images.push(response);
            break;
        }
        return images;
    }

    async getFirstImagePaths(directoryPath: string, maxDepth: number = 10): Promise<string[]> {
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
}
