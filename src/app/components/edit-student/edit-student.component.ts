import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { StudentsService } from 'src/app/students.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {

  constructor(private student:StudentsService, private router:ActivatedRoute, private route:Router) { }
  editStudent=new FormGroup({
    id : new FormControl(''),
    sname : new FormControl(''),
    age : new FormControl(''),
    branch : new FormControl('')
  });
  message:boolean=false;
  ngOnInit(): void {
    console.log(this.router.snapshot.params['id'] );
    this.student.getStudentById(this.router.snapshot.params['id']).subscribe((result:any)=>{
      console.log(result);
      this.editStudent=new FormGroup({
        id : new FormControl(result['id']),
        sname : new FormControl(result['sname']),
        age : new FormControl(result['age']),
        branch : new FormControl(result['branch'])
      });
    });
  }
  UpdateData(){
    this.student.updateStudentData(this.router.snapshot.params['id'],this.editStudent.value).subscribe((result)=>{
      this.message=true;
    });
  }
  removeMessage(){
    this.message=false;
    this.route.navigate(['/list']);
  }

}
