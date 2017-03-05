import React, { Component } from 'react';
import Page from '../pages/Page';
import LoginContainer from '../containers/Login';

class Login extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle() {
    return 'Login| reactGo';
  }

  pageMeta() {
    return [
      { name: 'description', content: 'A reactGo example of a login or register page' }
    ];
  }

  pageLink() {
    return [];
  }

  render() {
    return (
      <Page {...this.getMetaData()}>
        <LoginContainer {...this.props} />
      </Page>
    );
  }
}

export default Login;
