import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {Apollo, gql} from "apollo-angular";
import {FormsModule} from "@angular/forms";

const DELETE_EMPLOYEE = gql`
  mutation Mutation($deleteEmployeeId: String!) {
    deleteEmployee(id: $deleteEmployeeId) {
      email
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
    }
  }
`;

@Component({
  selector: 'app-delete',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.css'
})
export class DeleteComponent implements OnInit {
  id: String | undefined;
  user: any = {};
  deleteId: String | undefined;

  constructor(private route: ActivatedRoute, private apollo: Apollo, private router: Router) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];

      this.apollo.watchQuery({
        query: GET_EMPLOYEE,
        variables: {
          id: this.id
        }
      })
        .valueChanges.subscribe((result: any) => {
        this.user = result.data?.getEmployee;
        console.log(this.user)
      })
    })
  }

  onSubmit() {
    console.log(`User id to delete: ${this.user.id}`);

    this.apollo.mutate({
      mutation: DELETE_EMPLOYEE,
      variables: {
        deleteEmployeeId: this.user.id
      }
    })
      .subscribe((value) => {
        this.router.navigate(['/main', value])
          .then(() => {
            window.location.reload();
          });
      })
    ;
  }

}
