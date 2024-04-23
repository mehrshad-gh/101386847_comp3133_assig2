import {Component, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {Apollo, gql} from 'apollo-angular';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

const GET_ALL_EMPLOYEES = gql`
  {
    getAllEmployees {
      id
      first_name
      last_name
      email
    }
  }
`;


@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    RouterLink,
    NgbModule
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {
  users: any[] = []

  constructor(private apollo: Apollo) {
  }

  ngOnInit() {
    this.apollo
    .watchQuery({
      query: GET_ALL_EMPLOYEES,
    })
    .valueChanges.subscribe((result: any) => {
      this.users = result.data?.getAllEmployees;
    });
  }
}
