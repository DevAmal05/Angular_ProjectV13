import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

   
  id:any
  errorMessage:string ='';
  formGroup: FormGroup;
  errorMessage1:string ='';
 
  Cin:string 
  firstname:string
  lastname:string
  phone:string
  userdetails:any= []
  
  userforupdate: AngularFireList<any>

  data = {
    Cin: '',
    firstname : '' ,

    lastname :  '' ,
    phone :  ''  
   } 
    id1: any;
    
  constructor(private router:Router,private firebase: AngularFireDatabase,
    private route: ActivatedRoute, private userService: UserService) {
    this.route.params.subscribe( params => {
      this.id = params
    });
    this.userforupdate = this.firebase.list('users');
    
    this.id1 = this.route.snapshot.paramMap.get('id');
    console.log(this.id1)
   }


  ngOnInit(): void {
    this.formGroup=new FormGroup({
      CIn: new FormControl('',[
        Validators.required,
      
        Validators.minLength(3)
      ]),
      fIrstname: new FormControl('',[
        Validators.required,
        Validators.pattern("[A-Za-z ]+"),
        Validators.minLength(3)
      ]),
      lAstname: new FormControl('',[
        Validators.required,
        Validators.pattern("[A-Za-z ]+"),
        Validators.minLength(3)
      ]),
      pHone: new FormControl('',[
        Validators.required,
        Validators.pattern("[0-9]+"),
        Validators.minLength(8),
        Validators.maxLength(13)
      ])
    
    });
    this.userService.getUserById(this.id1).subscribe((results) => {
      
      this.getuser(results)
    
    })

  }

  getuser(entries: any[]){
   
    this.userdetails = [];
  
    entries.forEach(element => {
       
       
      let y = element.payload.toJSON()
      y["$key"] = element.key
      this.userdetails.push(y as User);

      this.data.Cin = this.userdetails[0]['Cin'] 
      this.data.firstname = this.userdetails[0]['firstname'] 
      this.data.lastname = this.userdetails[0]['lastname'] 
      this.data.phone = this.userdetails[0]['phone'] 
     
   })
   console.log("res");
   console.log(this.data.lastname);
   console.log(this.userdetails);
   }

  onSubmit1() {
  
    let create = 'false';
    
     console.log(this.data.Cin);
     this.userforupdate.update(this.id1 , {
      Cin :  this.data.Cin ,
      firstname : this.data.firstname  ,
      lastname :  this.data.lastname ,
      phone :  this.data.phone
    }).then(added =>{




      
      this.router.navigate(['/people-list'])
    
   

}).catch(error=>{
console.error(error)
this.errorMessage1= error.messaage
console.log('error', error)
console.log(error.message)
})
  
  

 
  }
}
