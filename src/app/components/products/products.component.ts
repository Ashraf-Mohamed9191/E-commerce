import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/shared/services/cart.service';
import { EcomdatapService } from 'src/app/shared/services/ecomdatap.service';
import { WishlistService } from 'src/app/shared/services/wishlist.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  constructor(private _EcomdatapService:EcomdatapService , private _CartService:CartService , private _ToastrService:ToastrService , private _WishlistService:WishlistService){}

  products:any[] = [];
  searchTerm:string ='';


  wishListIds:string[] = [];

  ngOnInit(): void {
      this._EcomdatapService.getAllProducts().subscribe({
        next:(response)=>{
          console.log(response.data);
          this.products = response.data;
        },
        error:(err)=>{
          console.log(err);
        }
      })


      // get wishList products id
      this._WishlistService.getWishListProduct().subscribe({
        next:(response)=>{
          const newData = response.data.map((item:any)=>item._id );

          this.wishListIds = newData;
        }
      })
  }



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


  addProdToWishList(productId:string):void{
    this._WishlistService.addToWishList(productId).subscribe({
      next:(response)=>{
        console.log(response);
        this._ToastrService.success(response.message);
        this.wishListIds = response.data;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
}
