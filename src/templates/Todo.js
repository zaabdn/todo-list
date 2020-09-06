import Header from "../components/Header";
import { Container, Typography, Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import InputTodo from "../components/InputTodo";
import ListTodos from "../components/ListTodo";
import { useQuery } from "@apollo/client";
import {
  GET_TODO,
  CREATE_TODO,
  UPDATE_TODO,
  DELETE_TODO,
} from "../../graphql/todo";
import { useMutation, gql } from "@apollo/client";

export default function Todo() {
  let input;
  const [todos, setTodo] = useState({
    title: "",
    completed: false,
  });
  const [email, setEmail] = useState("");
  const { loading, error, refetch, data } = useQuery(GET_TODO);

  const handleChangeCheck = (event) => {
    setTodo({ ...todos, [event.target.name]: event.target.checked });
  };
  const handleChange = (e) => {
    setTodo({ ...todos, [e.target.name]: e.target.value });
  };

  const [createTodo] = useMutation(CREATE_TODO, {
    onCompleted: () => {
      refetch();
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    createTodo({ variables: { title: todos.title.value } });
    todos.title.value = "";
  };

  const [updateTodo] = useMutation(UPDATE_TODO, {
    onCompleted: () => {
      refetch();
    },
  });

  const handleUpdate = (id, e, completed) => {
    e.preventDefault();
    updateTodo({
      variables: { id: id, completed: completed },
    });
  };

  const [deleteTodo] = useMutation(DELETE_TODO, {
    onCompleted: () => {
      refetch();
    },
  });

  const handleDelete = (id, e) => {
    e.preventDefault();
    deleteTodo({ variables: { id: id } });
  };

  useEffect(() => {
    setEmail(localStorage.getItem("email"));
  });
  return (
    <div>
      <Header title="Todo" />
      {email ? (
        <main>
          <Container
            maxWidth="sm"
            style={{ marginTop: "50px", paddingBottom: "100px" }}
          >
            <Grid item xs={12} align="center">
              <img
                src="https://media-exp1.licdn.com/dms/image/C4D0BAQGrzneL3Dpmxw/company-logo_200_200/0?e=2159024400&v=beta&t=145tUYuZya2-FCl7P369j8wX6QAhnLt-gzSOuHVizvg"
                alt="logo"
                width="150px"
                height="150px"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h3" align="center">
                <b>Let's do</b>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" align="center" color="textSecondary">
                Coding, Eat, Sleep, Repeat
              </Typography>
            </Grid>
            <InputTodo
              todos={todos}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
            {!todos ? (
              <h1>Loading...</h1>
            ) : (
              <ListTodos
                data={data}
                handleDelete={handleDelete}
                handleChangeCheck={handleChangeCheck}
                handleUpdate={handleUpdate}
              />
            )}
          </Container>
        </main>
      ) : (
        <div style={{ marginTop: "50px" }} align="center">
          <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMSEhUSEBIWExUTFhMTGBcVEhUVFRcWGBcYGBUSExgaHiggGBolHRYXITEiJSkrLi4uGB8zODMtNygtLisBCgoKDg0OGxAQGyslICMrKzAtLy0tMi4vLS4tLS0wMS0tLS0yKy4tLS0uLS8tLS0tLS0vLS0vKy0rLS0tLS0tLf/AABEIALsBDQMBEQACEQEDEQH/xAAbAAEAAQUBAAAAAAAAAAAAAAAAAwECBAUGB//EAEYQAAIBAgMEBQcIBgoDAAAAAAABAgMRBCExBhJBUQVhcZGhExQiMoGx0QcWQlJTk8HSVHKSosLwFRcjMzRigoOy4UNzo//EABoBAQACAwEAAAAAAAAAAAAAAAABBQIDBAb/xAA4EQACAQIEAwQJAwQCAwAAAAAAAQIDEQQSITEFQVETYaHRFCJScYGRscHwFTLhBkJy8SMzNEOC/9oADAMBAAIRAxEAPwD3EAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAApKSWrsSk2CCpjIrTMzVJvci5jTxcnpkbFTihctWJlz9xOSPQE9LG/WXtRhKl0FzLjJPNZmpqxJUgAAAAAAAAAAAAAAAAAAAAAEdasorMyjFyBjPHPgvE29kupFyx4yXV3E9lEXHnkuruHZxFy6ONfFL3EOkhcljjI8bowdJi5IsRH6xGSXQkr5eP1l3kZJdAUeJjz95PZy6AseMj1v2E9lIXLJY7lHvZkqXeRcjljJcLIyVJC5FKvJ/Sfu9xkoRXIEbMiAAAAAAC+lVcdP+jGUU9yTYUK6l28jRKDiSSmAAAAAAAAAAAAAAAAAAAABr8f63sX4nRS2IZjmwgAAAAAAAAAAAAAAAAAAAAAAAAAF1Ke60yJK6sSbZM5CQAAAAAAAAAAAAAAAAAAAYfSENH7DdSfIhmGbiAAAAAAAAAAAAAAAAAACOrWjH1pKPa/cZRjKWyApVoy9WSfY/eJQlHdAkMQAAAADaYd+iuxHLP9zMiQxAAAAAAAAAAAAAAAAAABBjfV7jZT/cGa46DEAAAAFlWVldK4JIPO+rxAsS0a28ASggAAAAAAxp4lpu606wTY5WtjXOTlLj4LgkWsEoqyMCahWcJKUdV49TMpRUlZg6xMqDIqAAAAbPC+quw5p/uZkSmAAAAAAAAAAAAAAAAAAANfi6287LReLOinG2rIMc2EAAAAAtnBPUElnm8eXiwC+EUskAXAgAAAAAAi83jy8WCTQYvohwk3CLlHha7a6miwpVoyWujMWi7BdGTk1vRcY8b5N9SRNSvGK0d2QkdEVxkAAAADa0VaK7Ecst2ZF5iAAAAAAAAAAAAAAWVKqWrMlFvYEE8auCv4GapPmRcxquIlLXTkjbGCQIjIgAEOKxUKUd+rOMIq15SkorPTNmUYuTtFXBMYgAAAAAAAAAhxWKp0o71Wcacb2vOSir8FdmUYyk7RVwSp3zXExBUAAAAAAAAAArFXaXPIhuxJtzkJAAAAAAAAAAAALZzSV2Sk3sDBrYtvTJeJvjTS3IuYsqiWrRsBTyseaALwQAAAcL8puOypUE9b1ZeMYfx9xZcPhvP4ESNHDbTGJJKpHJJf3cOHsOl4Kj08SLsu+e2M+0j93D4EehUeniMzL6e2WNf/kj93D4HPiKeHopZk9e82U6cqj0JPnbjPtY/dQ+Bx9th/YfzN/osupSe12NSuqkX/tQ+Bsozw9SWVxa+JjUw8oq6dyH57Yz7SP3cPgWHoVHp4nNmY+e2M+0j93D4D0Kj08RmZh9K7R4jEwVOtJOKkpWUIxzSaWa7WbKeGp03miiLne7CdJeWwqi36VH+zf6v0H3Zf6WVmMp5Kl1s9fMyR0ZyEgAAAAAAAAE+DjeS6szCo7RJRsTmJAAAAAAAAAAAANdjKl5W4LL4nRTVkQyA2EGPWouT4ePiCSxYV814gXMqKtkAVBBwfTvSmLoV501Wlu33o+jD1ZZrhw09hfYXD4erSUsqvz33MW3c57HVZVp79ZucrJXeWS0WWR2woU4K0VZGNzH82j9X3meSIHm0fq+8hxgldgrSoXko01dyaSS4tnmeJV4VKl4vRIs8NTcYa8zYPoDErPyL74vwTKvtqfU6DWtczaBGhF/R956jA14V6ev7lv5/Eqq9PJLuK+bR+r7zuyRNI82j9X3jJEGZ0di6mHcnQk4OSSdkne2l735s11MPSqfuVxc7XY7FV6yqTrVHKKtCKais9ZPJL/L3sp+I06VNxjBWe7M43OkK0kAAAAAAAGdgIZN8/wNFV62JRlGokAAAAAAAAAAAA1eJjaT7b951Qd4ogjMiAARYrEwpx3py3V+PJJasxlJRV2baVGdWWWCuyzB4yFVXpyvbJ5NNdqYjOMtjKvh6lF2qKxzmP24pUak6U6NTepycXnCzto1no1Z+074YGU4qSa1Oe5z20u09HEqG5SnGUG85bvqtZxyfOz7ywwdKdBu7un9SG7mh88XJ+B39qjEeeLk/AdqgXwrbyyKfi1duMYLnqzswkFdyNrszJLE097nJLtcWl4s89X/AOtneegFcSaTpnZ+lU3qifkpWcm0vRds25L8V4m+nXlHTcHDJllCpKm7xdmYSipKzLJYtJ2aZ6uhiM9KMnu0ipqRyyaKeeLk/A3dqjAPGLk/AdqgdlhNusNThGnChUUYqyScPa9db5lLUwVWcnKUldmd0bfoHauni6vkqdOcWoubct2ySaXB82jnrYWVKOZtBO5vcRXjBb05KK5v3HJKSirs206U6kssFdlMNiYVFvQkpLTL3PkRGSkromrRnSllmrMlMjUACsY3dlxIbsDawjZJLgcrd3cyLiAAAAAAAAAAAAAYuOpXW8uGvYbaUuRDME3kAA021OHcqSkvoO7XU8r+zLxOfERvG/QtuEVVCtlf9y8TH2Sw7SnUekrRXXbNvxt3mOGjo2buNVU5Rprdav4/n0MjaHoOGIi5erUinaXNL6M+a93g7bCYuVGVt4vl5FE1c8yniUufs/E9FKUU7GBWpiFHW77CJTigHiFa+efeM8bXBaqylny5lVxOg6sVUh/bv7jqwtRRbi+ZVO2ayaz/AO0efLE9G6FxMqlCnOdnJp3el7Nq/gVlWKjNpEmDtfKaw/ouycoqVuMXfJvt3TZh7Z9QzhzvIKSxCjk7npuHV4uglzWhV4mNqj7y6WISSeefed7nFK5oHnCtvZ/iM8bXBP0cvLVIU4uznKMM+F2le3LMxlVjGDl0TYPUuiujYYeG5TXbJ+tJ838OB5qvXlWlml/o2JWNftXRbpxktISzX62Sffl7ThxMW43Ljg1SMari+a0+HL86EeyVBqM5vSTUV17t7vxt3mOGjo2bONVIuUYLdXfz/wBHQHUUYAM/CULZvX3GipO+iJMk1EgAAAAAAAAAAAAAAGtxNHdeWj0+B0wlmRBCZkGtx/TFGEnTneXCVldJNaS9nK5pnWhF2ZYYfh9erHtIadNfoaXpnE7tOlSpu0UpXs/WV/Rk+1el/qNNaVkox2LLhlN1KlSrVV5XtryfMztm5zdGe9dxXqt9j3kurTxNuFcnucnGI041Vl3tr9vj/B5TW9Znrp/uZSF1fVdkfcJbgS9Rdr9yD/aCXBYedS8KcXKTtZLXUwnVhSg5TdkZKLk7Iz8dgp0ZblRWlZPJ316zySnGbbjtcucrSVzr9jZt4ez+jOSXZZP3tnDiV6/wJRtcfhI1acqctJLhqmndNe1I1Qk4u6BwfTPRnkKipqW/dJp2tq2ra9XiWFOpnjcNNamFjsFOD3KsXGXX70+K7DqwuKdOWaOq5mmrSVRWZg1lZRXb7z06kpwjJcyqaadmU+h/q/Ay/t+JBsdlv8XR/wDZT/5xNVX/AKp/4slbnsJ50zNdj+k6EW6VSWqtJWbST5tGqdSC9Vndh8HiJpVaa22+HQ03S+KcIUqVOW6lF33Xbes3G9+Tab67mitLKlGJZ8NpKtKdaqru/Pl10+XuNrspKpUpy3rySlZSl2Zq/GxnRqPL6xx8WpU4VVkVrrVI6ahhlHPV/wA6CVRsrCcwAAAAAAAAAAAABSckk29ErslK7sgePy2pxbbarzV23bLK/DQ9guH4ZK2RGrMynznxn6RP934D0DDewhmZSW0uLeTxE/D4ErA4df2IXZZ84MV9vPw+Bl6HQ9hEXZbDpHed6jbk83Ln1sosdwao5udGzT5bNfY9DgOK0oU1Tq6W58vMsxWMle0ZXVl124bvZkZ8O4dGf/kRd48ns99e/p0NWOxzpyfo8laWra3vtbu2v1L/AOnsTa3lpWta2VrctC5WDoL+xFI5N6tmrdGPJHQ4pkB0ovVDKgPJR0sMqB0mxFCKnUklZqMV3u/8J5z+onlpwiubb+S/k7MEvWbK7bwW9CXFq3de/vRQYXmWza7G3O/2N/0HTjHD0lDRwjLtcleT72znqtubuaTObMCTm8bh4Ymu4uXo2spRed1HVe03wk4K6LCdLLhfWWv8+RkbW4dSwzk85U3Fp25tRl33vbqROFzOplit+RWtpK7OJdNPVXPd4Og6dCMZ7+ZUVpKU20PJRta3WdWVGsvw/oSU4ejKLTTWqazTIdOLTTW4Nn84MV9vPw+Bp9Doewhdinj97Oo/Sebb4vmeex3CKyqOdJXi+XNfncelwHE6KpRp1HZpW7n+d5Fi8ZK9lK6srO97JKyiuy3ibeHcPhWV66d46WenxfP/AEaMbjZUJONBq0/Wute52+V/iT09o8VFKMa8klkklFJLklYufQMN7CKNzk3dsu+c+M/SJ/u/AegYb2ERmY+c+M/SJ/u/AegYb2EMzNnsxtFiZ4qjGrWlKEpOLTtZ3i0uHOxzY3BUI0JOEUml9yU3c9PPLmwAAAAAAAAA1e0+I8nhK8r2/s5RXbJbq8WjqwUM+Igu9eGpD2PGj2ZqAAACREpKKu3ZExi5OyV2VatqRGSkrxd0JRcXaSsytCi5SaXJXfLU5MVi4YZOc+5JdXqdGFws8TPJH4voS4jDOGd7ruNOA4nDFNxtZrXrob8bw6eFSle6enTXxICzK8AAA6bYnWr2U/4zzH9Sf+r/AOvsduC/u+H3J9qKanKMXpu3XU29V3HnaMnHVHoMJRjUpSUuphYHFVaUFCNR2V7ZLi78b8zOdpO9jop4Kmo2kr+BWtiZz9eTfa8u7QhJLY6IUoQ/arFlCVpRd7elHvurGcKbm8q/LamGJnGFKTl0+uhutq/8PL9aH/I6+B29Mj7n9DzOK/62cOe5KsAAAIhtLVhK7sgE7jYuoUnKTS5L2a/E5MTiqeGTnPuVubep0YbDTxE8kPj3EmIwzhrmma8FxGnim4pNNcn0N2M4fUwtm3dPn3kJYHCADK6Kq7lelP6tWnLukmzVXjmpSj1T+gR7eeHNwAAAAAAAABy3yj4jdwm79pUhH2K8/wCBFrweGbEX6J+X3MZ7Hl56g1gAAGVgJpN3yvp+JS8bo1alOPZptJ6peD+H3Lfg9alTqSztJtaN+K+OhPjIRkr3V11ruKzhdathqmWUZZXvo9O/z7vcWXE6NKvTzRksy21Wvd5d5jYTFKMfVzebz/ngWOL4XUxU+0c7dFbbx+ZW4PiUMNTyKF3zd9/AYnE7+VrI6MBwyOFk55rt6bW08TVjuIyxSUbWS16mOWhWgAAHU7FQyqvm4Lu3n+KPK/1HL1qce5/byO/BLST9xftBVvWUeVOL9rlL4Ip40ksOqnWTXyUfNl5w6o884dyf1Nbmay1KsgEOIlZwfKcX3MuODwUp1P8ABlPxltUof5L6M6faWF8NU6t1904s4ODyy4yn8foytxKvSZwZ74qQAADM6Okru+uVih47TqyhFxTcVe9vC/iXfBJ0ozkpWUna33sS46imt5arxRwcJxsqM+zn+1+D8uvz6ndxXBxqw7SH7l4rz6fIgwmJjGOju83od2M4ZXxVTO5JLktdP56nBguI0MNTy5Xfm9NS3FYnfySstTp4dwz0WTnKV21b4GjiHEfSUoRVkncxy2KwAFJBA91wtXfhGa+lGMu9XPCTjlk49GbiUxAAAAAAAAOB+VDEZ0KfVUm/3VH+Iv8AgkNJz9y/PAwmcIXxgAAAAC2en8+0wqbW6gy4YKTV8l1FVV41Qp1XCzaW7X5r+WLWlwetUp57pX2X5sYOIq7vDPQtJVFZNcyraadmWUMRvOzREKl3YgyDaCClUnOe5Tg5Sbsks2zmq4mNNOUnZLqTGLk7I9E6AwDo0lGVt6TcpWd0m7K1+NkkeJ4njFiq+eOyVl+e8taFPs4We5pelZ3xNX/Kqcf3bv3m6qsuDorrnfjYseFq9Wq/8V9SA4S5ABj4+N4O3DMs+EVezxUb7PT5/wAldxalnw0muWv58DtcVSVWnKN8pxav+ssmVNKboVVLnF/RlVJZ4tdTzrF4WpRqeTrRs9U1nGS5xZ77B42nio5ofyveVFSnKDsyM7DAxamLs2ktMjS6tmCelPeVzZGV1cFZrx/lkVNVbr+fQiyMqODk1fLs4ldU4xhoVezd9N3y8/As6fCcROn2it7ufl4mOWhWgAAAA9k2Vq72DoPlThH9lbr9x43HRy4ia7346m1bG1OQkAAAAAAAHH7V7K1sXXVWE6cYqEYJScr5OTbyXORcYDiNLD0skk73uYSjc0v9XuI+0pd8/wAp2/rVH2ZeHmRkY/q9xP2lH9qf5R+tUPZl4eYyMp/V9iftKP7U/wAhP6zQ6S8PMZGazpDZ+WHnuVnGTcVJbjdrNtZtpZ5HFi+Ny0VBW6tlxw3h1OvFzqdbWRTAbOzrSTpODSmk4uTUs4yd9LW9F8eBH6y50LWtPu26XMK+BhhsRHO/Uevy5fnJnQPY/E2ydK/Jzl+EGUtOlBv/AJG0u5X+rRY1eM00vUi2+/Rfc10thKqnGWJcHTu3Lyc5bzfBZxVlcvMXxaEaOWgndaarZfNnn4R7Speb3KYzY6n61CTg19GTcov26rxOHCcdnCX/ADK66rR+T8DoqYRNeqQfNGsmt6pSs+MZSk0uzdXdctavH8NGN4pt8lt/o54YacnZ6HQ9EdD06C3aMG5P1pWvOXa+XUsjy2JxdXFTvP4JbIsIU4UlobDF9H4nd/sYQ3n9pKyXXZLPsyNmFw9KUr120ui3fkaquItpDU43FdH1aE5RrtOpJ77ad9fYjs4lXpVJxVJWjGNl+fIt+DRaoyk93L7IjK0tgAUauZRk4tNboiUVJOL2Zv8AoHC4xU4WpQq0rejJVYxmorRWeTtpbIssZTwuIfawllk9WraX/PeeRc54ebpTV7OxtOkujN6navD0Xza9F8HdPJlbTlWw1TPTeq5r8295tz06qszR4bZSlFtzlKavkvVVuu2bfcWdb+oMRKNoJRfN7/K+i8TVHBwT11MzEbPU5UpxpYWEpOMrejFPeaye+9M873OOhi8TOqpSqStfXV2+RlVVKMWrK5yT6BqUH5PELdla9lKLybdndX5F5ieM9mlGjZ9W7/wbeH8NjiIOdRu17K34yTB9AVasl5KO/Het60E77spWabXBPPTJkz4uqmHutJ9Pha9/EwqYGGHxMY1H6m9/tp+W1N1U2cxi0w7f+5SX8ZSUsNCT9eaivc2/p9y2q8YoxXqJt/JfnwNdLY/Ha+Q/+lL856yPEcJFJKe3c/I8tLNJtvmW/NDG/o7+8pfnMv1LC+34PyIysfNHG/o7+8pfmH6lhfb8H5DKynzSxv6O/wBul+YfqWF9vwfkMrPQ9jcLUpYWFOtBwlFzybTyc3JPJvmee4jUhUrucHdO30sbI7G7OEkAAAAAAAAAAAAAGB0p0RSxCXlY5rSSdpL4+0hxT3OnD4urQfqPc1mG2ejhqkKtOpN2kouMt13U/QzaS03r+wiMbbG/E8QliKeScV71+M6IyK8o1fUA4T5QOnFhXCnQivKT9Jt3ajFdV9W/czKnhoVLtmarzjszisRtfipWtKNO31Kaz7d/eN0cFRjyv7/xCWJqPuMjD7e46GXlIPtowX/FI2+j0+SNTk3uZUflJxq4UX205fhND0eHeRmNZi9qalao6lWEXKVr7l4pWSSsm3y5mmeETd0y2wnFXQgqbjdLvMzo7Eyr/wB3RqPOze6t1Prley1OSrR7P9zRaUuK0qn9svl/J0f9Bej6/pdno35c/acvaE/qHrbaeJyGK6aUG4+TlvRbTUrRs1qnqd8MI5K91Y0VeNU43UItvv08zHjtJikt2nXnTj9WEnFLsO2FCEVYosRiJ16meW/cYGKxVSq71ak6jXGc5TffJs2JJbHORRk1o2raWenYTYHr/wAmnSdavhn5aTnuTcIylnJxSi83xs5NX6jirRSloZo3nS/QdLEWc7qSVlKLSdtbO6aaOdxTOzC42rh7qOz5M12A2f8ANqsKkarlHes4uPNSjF3vzkuHERjY3YrH+kU1GUbNc7/n1OkMiuAAAAAAAAAAAAAAAAAAAAAAAAIcXTcoNK17XjfRSWcW/akATAAA4r5QdlpYlKtRzqQTW7pvR1tfg1quGbvzW6jUy6PYho8nr03CTjNOMlk4yVmu1M7U76owLN5cwBvLmASUaMp+pGUv1YuXuDaW4O32LoVKEKirUpwUpRa3o7vBp5PNcOBU45xlJWZ34W6TubvpHpNU6U6kY7zhFys3bTrzOOnDPNRfM6JyyxbPPOl+m5Yh3nClHrjTW9bgnN3l3WLujh40tm/n9itqVXPdI1lzeaiWhQnPKnCU3yhFyfgQ2luDpehdhMVXadSPkYcXP1rf5Y8+2xqlXittSbHrHQ3RcMNSjSpqyiva+Lb62237TjlJyd2ZmcQCHGU3KDS1VpLrlFqUU+q6QBMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAARTw0HrCL7YpgFnmNL7KH7EfgLgrHB01pTguyC+ABMopaKwAcU9UAWPDw4wj+ygDGl0Rh3rQpP/AG4/AnM+oLodF0FpRprspx+AuwZMKaWiS7EkQC4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/9k=" />
          <br />
          <Typography variant="h2">WELCOME</Typography>
        </div>
      )}
    </div>
  );
}
