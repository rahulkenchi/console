import React, { useEffect } from "react";
import { Container, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Spinner from "../../../../components/loader/Loader";
import RolesAndPermissions from "../../../../components/roles-and-permissions/RolesAndPermissions";
import { ToastAlert } from "../../../../components/toast-alert/toast-alert";
import { RootState } from "../../../../store";
import { useAppSelector } from "../../../../store/hooks";
import { IUserDataState } from "../../../../types";
const AdminDashboard = () => {
  const navigate = useNavigate();
  const user: IUserDataState = useAppSelector(
    (state: RootState) => state.userData
  );

  useEffect(() => {
    // use any one of below
    if (user.error) ToastAlert("Userdata not found", "error");
    if (!user.loading && user.error) {
      navigate("/error", { state: user.error });
    }
  }, [user.loading]);

  return (
    <>
      {user.loading && <Spinner />}
      {!user.loading && user.data && (
        <React.Fragment>
          <Container>
            <Card style={{ width: "550px" }} className="m-1 p-2">
              <Card.Title style={{ fontSize: "32px" }} className="text-center">
                Admin Details
              </Card.Title>
              <hr />
              <Card.Body
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  textAlign: "left",
                }}
              >
                <Card.Text>
                  Name:&nbsp; <span>{user?.data?.username} </span>
                </Card.Text>
                <Card.Text>
                  <span>
                    Created Date and Time :&nbsp;{user.data.createdTimestamp}
                  </span>
                </Card.Text>
                <Card.Text>
                  <span> Number of Tenants:&nbsp;{user.data.count}</span>
                </Card.Text>
                <Card.Text>
                  <RolesAndPermissions
                    heading="Roles"
                    list={user?.data?.roles}
                    classes="roles"
                  />
                </Card.Text>
                <hr />
              </Card.Body>
            </Card>
          </Container>
        </React.Fragment>
      )}
    </>
  );
};
export default AdminDashboard;
