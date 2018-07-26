import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username;
  password;
  type = 'password';
  public auth2: any;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  togglePassword() {
    if (this.type === 'password') {
      this.type = 'text';
    } else {
      this.type = 'password';
    }

  }



  public googleInit() {
    console.log('googleInit');

    gapi.load('auth2', () => {
      console.log('gapi.load');
      this.auth2 = gapi.auth2.init({
        client_id: '645234842087-kr8s094tenmhesf85a5aaq3da0anl1ol.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignin(document.getElementById('googleBtn'));
    });
  }
  public attachSignin(element) {
    console.log('attachSignin');
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {
        const profile = googleUser.getBasicProfile();
        // console.log('googleUser');
        // console.log('Token || ' + googleUser.getAuthResponse().id_token);
        // console.log('ID: ' + profile.getId());
        // console.log('Name: ' + profile.getName());
        // console.log('Image URL: ' + profile.getImageUrl());
        // console.log('Email: ' + profile.getEmail());

        // YOUR CODE HERE
        // localStorage.setItem('token', googleUser.getAuthResponse().id_token);
        // localStorage.setItem('id', profile.getId());
        // localStorage.setItem('name', profile.getName());
        // localStorage.setItem('imageURL', profile.getImageUrl());
        // localStorage.setItem('email', profile.getEmail());
        const user = {
          token: googleUser.getAuthResponse().id_token,
          id: profile.getId(),
          name: profile.getName(),
          imageURL: profile.getImageUrl(),
          email: profile.getEmail()
        };
        localStorage.setItem('user', JSON.stringify(user));

        // this.router.navigate(['home']);
        this.login();
      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    console.log('ngAfterViewInit');
    this.googleInit();
  }

  login() {
    // this.router.navigate(['home']);
    // const user = {
    //   token: 'token',
    //   id: 'id',
    //   name: 'name',
    //   imageURL: 'imageURL',
    //   email: 'email'
    // };

    // user.token = localStorage.getItem('token');
    // user.id = localStorage.getItem('id');
    // user.name = localStorage.getItem('name');
    // user.imageURL = localStorage.getItem('imageURL');
    // user.email = localStorage.getItem('email');
    console.log(localStorage.getItem('user'));
    this.router.navigate(['home']);

  }
}
