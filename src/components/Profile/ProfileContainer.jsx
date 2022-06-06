import React from 'react';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import Profile from "./Profile";
import {getStatus, getUserProfile, updateStatus} from "../../redux/profile-reducer";
import {withAuthRedirect} from "../../hoc/WithRedirect";
import {compose} from "redux";

class ProfileContainer extends React.Component {
  componentDidMount() {
    let userId = this.props.match.params.userId || this.props.authorizedUserId;
    if (!userId) {
      this.props.history.push("/login");
    }
    this.props.getUserProfile(userId);
    this.props.getStatus(userId)
  }

  render() {
    return (
      <Profile profile={this.props.profile}
               status={this.props.status}
               updateStatus={this.props.updateStatus}
               {...this.props}
      />
    );
  }
}

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  authorizedUserId: state.auth.userId,
  isAuth: state.auth.isAuth
});

export default compose(
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus}),
    withRouter,
    withAuthRedirect
)(ProfileContainer);
