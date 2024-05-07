import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  @ViewChild('myModal') model: ElementRef | undefined;
  customerObj: customer = new customer();
  customerList: customer[] = [];

  ngOnInit(): void {
    const localData = localStorage.getItem("customer");
    if(localData != null) {
      this.customerList = JSON.parse(localData)
    }
  }

  openModel() {
    
    const model = document.getElementById("myModal");
    if (model != null) {
      model.style.display = 'block'
    }
  }

  closeModel() {
    this.customerObj = new customer();
    if (this.model != null) {
      this.model.nativeElement.style.display = 'none';
    }
  }


  onDelete(item:customer) {
    const isDelet = confirm("Are you sure want to Delete");
    if(isDelet) {
      const currentRecord =  this.customerList.findIndex(m=> m.id === this.customerObj.id);
      this.customerList.splice(currentRecord,1);
      localStorage.setItem('customer', JSON.stringify(this.customerList));
    }
  }

  saveCustomer() {
    const isLocalPresent = localStorage.getItem("customer");
    if (isLocalPresent != null) {
      
      const oldArray = JSON.parse(isLocalPresent);
      this.customerObj.id = oldArray.length + 1;
      oldArray.push(this.customerObj);
      this.customerList = oldArray;
      localStorage.setItem('customer', JSON.stringify(oldArray));
    } else {
      const newArr = [];
      newArr.push(this.customerObj);
      this.customerObj.id = 1;
      this.customerList = newArr;
      localStorage.setItem('customer', JSON.stringify(newArr));
    }
    this.closeModel()
  }
}


export class customer {
  id: number;
  name: string;
  phoneNo: string;
  email: string;
  address: string;

  constructor() {
    this.id = 0;
    this.email = '';
    this.phoneNo = '';
    this.name = '';
    this.address='';
  }

}