import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  freshnessList = ['Brand New', 'Second Hand', 'Old'];
  productForm!: FormGroup;
  actionBtn : string = "Save";

  constructor(
    private formBuilder:FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editData: any
    ) {}

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName:['',Validators.required],
      category:['',Validators.required],
      freshness:['',Validators.required],
      price:['',Validators.required],
      comment:['',Validators.required],
      date:['',Validators.required]
    })

    if (this.editData)
    {
      this.actionBtn = "Update";
      this.productForm.controls['productName'].setValue(this.editData.name);
    }
    
  }

  addProduct(){
    //If you have data in the edit data, then we jump to the update function, else add the product
    if(!this.editData){
      console.log(this.productForm.value);
    }else{
      this.updateProduct()
    }
  }
  updateProduct(){
    console.log("Magical updated data");
    
    //Example code for magical update
    // this.api.updateProduct(this.productForm.value,this.editData.name)
    // .subscribe({
    //   next:(res)=>{
    //     alert("Product updated");
    //     this.productForm.reset();
    //     this.dialogRef.close('update');
    //   },
    //   error:()=>{
    //     alert("Error while updating");
    //   }
    // })
  }

}
