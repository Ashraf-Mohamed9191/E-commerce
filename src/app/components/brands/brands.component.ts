import { Component, OnInit } from '@angular/core';
import { EcomdatapService } from 'src/app/shared/services/ecomdatap.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {
  constructor(private _EcomdatapService:EcomdatapService){}

  brandsData:any[] = [];

  ngOnInit(): void {
      this._EcomdatapService.getAllBrands().subscribe({
        next:(response)=>{
          console.log(response.data);
          this.brandsData = response.data;
        },
        error:(err)=>{
          console.log(err);
        }
      })
  }


  
}

