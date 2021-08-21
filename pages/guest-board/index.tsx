import { Suspense } from "react";
import { Row, Loading as GeistLoading } from "@geist-ui/react";
import dynamic from "next/dynamic";
const GuestBoard = dynamic(() => import("../../components/guest-board"));

function Loading() {
  return (
    <Row style={{ padding: "150px 0 10px 0" }}>
      <GeistLoading>Loading</GeistLoading>
    </Row>
  );
}

function GuestBoardPage() {
  return (
    <Suspense fallback={<Loading />}>
      <GuestBoard />
    </Suspense>
  );
}

export default GuestBoardPage;
