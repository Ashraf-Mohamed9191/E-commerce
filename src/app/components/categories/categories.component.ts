import { Component, OnInit } from '@angular/core';
import { EcomdatapService } from 'src/app/shared/services/ecomdatap.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  constructor(private _EcomdatapService:EcomdatapService){}

  categoriesData:any[] = [] ;
  subCategoryData:any[] = [];
  categoryName:string = '';


  ngOnInit(): void {
      this._EcomdatapService.getCategories().subscribe({
        next:(response)=>{
          console.log(response.data);
          this.categoriesData = response.data;
        },
        error:(err)=>{
          console.log(err);
        }
      })
  }



  displaySubCategory(cateId:string , cateName:string):void{
    this._EcomdatapService.getAllSubcategoriesOnCategory(cateId).subscribe({
      next:(response)=>{
        console.log(response.data);
        this.subCategoryData = response.data ;
        this.categoryName = cateName;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
}
