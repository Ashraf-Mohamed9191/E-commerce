import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { EcomdatapService } from 'src/app/shared/services/ecomdatap.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit{
  constructor(private _ActivatedRoute:ActivatedRoute , private _EcomdatapService:EcomdatapService , private _CartService:CartService , private _ToastrService:ToastrService){}

  productDetails:Product = {} as Product;

  idProduct:any ; 


  addCart(productId:string):void{
    this._CartService.addToCart(productId).subscribe({
      next:(response)=>{
        console.log(response);
        this._ToastrService.success(response.message , 'Fresh Cart');
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }





  productSliderOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['<', '>'],
    autoplay: true,
    autoplaySpeed: 300,
    items: 1,
    nav: false
  }



  ngOnInit(): void {
      this._ActivatedRoute.paramMap.subscribe({
        next:(param)=>{
          this.idProduct = param.get('id');

        this._EcomdatapService.getProductDetails(this.idProduct).subscribe({
          next:(response)=>{
            this.productDetails = response.data;
            // console.log(response.data);
            
          }
        })
        }
      })
  }

}
