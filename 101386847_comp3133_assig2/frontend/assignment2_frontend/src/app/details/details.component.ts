import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {Apollo, gql} from "apollo-angular";
import {CurrencyPipe} from "@angular/common";

const GET_EMPLOYEE = gql`
  query($id: String!) {
    getEmployee(id: $id) {
      id
      first_name
      last_name
      email
      gender
      salary
    }
  }
`;

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {

  id: String | undefined;
  user: any = {};

  constructor(private route: ActivatedRoute, private apollo: Apollo) {
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
      });

    })


  }

}
