import React from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";

const RequestItem = props => {
  const id = props.requestTicket.id;
  const name = props.requestTicket.name;
  const phone = props.requestTicket.phone;
  const email = props.requestTicket.email;
  const position = props.position;
  const clickHandler = props.clickHandler;
  const title =
    (position
      ? position +
        (position % 10 === 1
          ? "st"
          : position % 10 === 2
            ? "nd"
            : position % 10 === 3
              ? "rd"
              : "th") +
        " — "
      : "Current Ticket: ") + name;

  return (
    <li>
      <Card>
        <CardHeader
          title={title}
          subheader={`Ticket ID: #${id}`}
          avatar={null}
        />
        <CardContent>
          <p>Phone: {phone}</p>
          <p>Email: {email}</p>
        </CardContent>
        <CardActions>
          {position === 1 && (
            <Button
              onClick={clickHandler}
              label="Claim"
              children={"Claim"}
            />
          )}
        </CardActions>
      </Card>
    </li>
  );
};

export default RequestItem;
