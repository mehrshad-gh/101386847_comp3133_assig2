import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {Apollo, gql} from "apollo-angular";

const UPDATE_EMPLOYEE = gql`
  mutation UpdateEmployee($updateEmployeeId: String!, $firstName: String,
    $lastName: String, $email: String, $gender: String, $salary: Float) {
    updateEmployee(id: $updateEmployeeId, first_name: $firstName,
      last_name: $lastName, email: $email, gender: $gender, salary: $salary) {
      id
    }
  }
`;

const GET_EMPLOYEE = gql`
  query($id: String!) {
    getEmployee(id: $id) {
      id
      first_name
      last_name
      email
      salary
      gender
    }
  }
`;


@Component({
  selector: 'app-update',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent implements OnInit {

  id: String | undefined;
  formData = {
    id: '',
    first_name: '',
    last_name: '',
    email: '',
    gender: '',
    salary: 0
  }

  constructor(private route: ActivatedRoute, private apollo: Apollo, private router: Router) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id']

      this.apollo.watchQuery({
        query: GET_EMPLOYEE,
        variables: {
          id: this.id
        }
      })
        .valueChanges.subscribe((result: any) => {
        this.formData = {... result.data?.getEmployee};
      });

    })
  }

  onSubmit() {
    this.apollo.mutate(
      {
        mutation: UPDATE_EMPLOYEE,
        variables: {
          updateEmployeeId: this.formData.id,
          firstName: this.formData.first_name,
          lastName: this.formData.last_name,
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
