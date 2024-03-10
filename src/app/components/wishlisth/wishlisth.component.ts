import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/shared/services/cart.service';
import { WishlistService } from 'src/app/shared/services/wishlist.service';

@Component({
  selector: 'app-wishlisth',
  templateUrl: './wishlisth.component.html',
  styleUrls: ['./wishlisth.component.css']
})
export class WishlisthComponent implements OnInit{
  constructor(private _WishlistService:WishlistService , private _CartService:CartService , private _ToastrService:ToastrService){}


  wishListData:any[] = [];

  wishListIds:string[] = [];  // to contains id s that is add to wishList


  displayProduct(){
    this._WishlistService.getWishListProduct().subscribe({
      next:(response)=>{
        console.log(response.data);
        this.wishListData = response.data;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  ngOnInit(): void {
    this.displayProduct()
  }


  removeProduct(id:string):void{
    this._WishlistService.removeProductFromWishList(id).subscribe({
      next:(response)=>{
        console.log(response);
        this._ToastrService.success(response.message);
        this.wishListIds = response.data;
        this.displayProduct();
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }


  addProductToCart(productId:string):void{
    this._CartService.addToCart(productId).subscribe({
      next:(response)=>{
        console.log(response);
        this._ToastrService.success(response.message)
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

}
