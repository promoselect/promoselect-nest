import { Controller, Get } from '@nestjs/common';
import { ChatgptService } from './chatgpt.service';

@Controller('chatgpt')
export class ChatgptController {
    constructor(private readonly ChatgptService: ChatgptService) {}

    @Get()
    async getInfoFromImage() {
        return this.ChatgptService.generateInfoFromImage();
    }
}
