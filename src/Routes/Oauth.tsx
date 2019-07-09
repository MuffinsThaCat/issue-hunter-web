import React from "react";
import { serverLoginAPIs } from "../api";
import { RouteComponentProps } from "react-router";
import queryString from "query-string";
import { toast } from "react-toastify";

interface Props extends RouteComponentProps {}
interface State {}

class Oauth extends React.Component<Props, State> {
  componentDidMount = async () => {
    try {
      const { code } = queryString.parse(this.props.location.search);
      const res = await serverLoginAPIs.login(code as string);
      const {
        data: {
          result: { token }
        }
      } = res;
      await localStorage.setItem("jwt", token);
      this.props.history.push("/");
    } catch (error) {
      toast.error(`😫 ${error.message}`);
    }
  };
  render() {
    return <div>GitHub Oauth Redirection</div>;
  }
}

export default Oauth;
