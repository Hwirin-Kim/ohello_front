import { Outlet } from "react-router-dom";
import { styled } from "styled-components";
import Header from "./Header";

export default function Layout() {
  return (
    <StLayout>
      <Header />
      <Outlet />
    </StLayout>
  );
}

const StLayout = styled.section``;
