import { Injectable } from '@nestjs/common';
import fetch from "cross-fetch";

@Injectable()
export class ReplicantService {
    async getTagsFromImage(){
        const Replicate = require("replicate");
        const replicate = new Replicate({
          auth: '',
          fetch: fetch,
        });

        const fs = require("node:fs/promises");

        // Read the file into a buffer
        const data = await fs.readFile("C:/Users/ariel/Pictures/TX-218G.jpeg");
        // // Convert the buffer into a base64-encoded string
        const base64 = data.toString("base64");
        // // Set MIME type for PNG image
        const mimeType = "image/jpeg";
        // // Create the data URI
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
          console.log(prediction.output);

        return prediction.output;
    }
}
