import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {Apollo, gql} from "apollo-angular";
import {Router, RouterLink} from "@angular/router";

const ADD_NEW_EMPLOYEE = gql`
  mutation AddNewEmployee($firstName: String!, $lastName: String!,
    $email: String!, $gender: String!, $salary: Float!) {
    addNewEmployee(first_name: $firstName, last_name: $lastName,
      email: $email, gender: $gender, salary: $salary) {
      id
    }
  }
`;

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent {

  formData = {
    firstName: '',
    lastName: '',
    email: '',
    gender: '',
    salary: ''
  }

  constructor(private apollo: Apollo, private router: Router) {
  }

  onSubmit() {
    this.apollo.mutate(
      {
        mutation: ADD_NEW_EMPLOYEE,
        variables: {
          firstName: this.formData.firstName,
          lastName: this.formData.lastName,
          email: this.formData.email,
          gender: this.formData.gender,
          salary: this.formData.salary
        }
      }
    )
      .subscribe((value) => {
        this.router.navigate(['/main', value])
          .then(() => {
            window.location.reload();
          });
      })

  }
}
