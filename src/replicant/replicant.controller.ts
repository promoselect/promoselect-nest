import { Controller, Get} from '@nestjs/common';
import { ReplicantService } from './replicant.service'; 

@Controller('replicant')
export class ReplicantController {
    constructor(private readonly replicantService: ReplicantService) {}

    @Get()
    getTags(){
       return this.replicantService.separateTagsAndColors();
    }
}
