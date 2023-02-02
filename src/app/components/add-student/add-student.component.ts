import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { StudentsService } from 'src/app/students.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {

  constructor(private student:StudentsService, private route:Router) { }
  addStudent=new FormGroup({
    id : new FormControl(''),
    sname : new FormControl(''),
    age : new FormControl(''),
    branch : new FormControl('')
  });
  message:boolean=false;
  ngOnInit(): void {
  }
  SaveData(){
    //console.log(this.addStudent.value);
    this.student.saveStudentData(this.addStudent.value).subscribe((result)=>{
      //console.log(result);
      this.message=true;
      this.addStudent.reset({});
    });
  }
  removeMessage(){
    this.message=false;
    this.route.navigate(['/list']);
  }
}
