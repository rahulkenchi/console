import { h } from "gridjs";
import { Grid } from "gridjs-react";
import React, { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import { ToastAlert } from "../../../../../../../../components/toast-alert/toast-alert";
import { setForms } from "../../../../../../../../store/features/gateway/key/create/slice";
import {
  IPolicyData,
  IPolicyListState,
} from "../../../../../../../../store/features/gateway/policy/list";
import { getPolicyList } from "../../../../../../../../store/features/gateway/policy/list/slice";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../../../store/hooks";
interface policyObject {
  name: string[];
  policyId: string;
}
export default function PolicyList() {
  const accessPolicyList: IPolicyListState = useAppSelector(
    (state) => state.policyListState
  );
  const StateKey = useAppSelector((RootState) => RootState.createKeyState);
  const dispatch = useAppDispatch();
  const [apis, setApis] = useState<policyObject[]>([]);
  const [selectedApi, setSelectedApi] = useState<string>("");
  const mainCall = async (currentPage: number, pageSize: number) => {
    dispatch(getPolicyList({ currentPage, pageSize }));
  };
  useEffect(() => {
    mainCall(1, 100_000);
  }, []);
  const handleAddClick = (Id: any) => {
    console.log("policyList", StateKey.data?.form.Policies);
    const data = StateKey.data.form?.Policies?.includes(Id);

    if (!data) {
      const list = [...StateKey.data.form.Policies, Id];
      dispatch(setForms({ ...StateKey.data.form, Policies: list }));
    } else {
      ToastAlert("Already select...", "error");
    }
  };

  const removeAccess = (Id: any) => {
    const removePolicyByIds = [...StateKey.data.form.PolicyByIds!];
    const removePolicies = [...StateKey.data?.form.Policies];
    const index = removePolicies.indexOf(Id);
    removePolicyByIds.splice(index, 1);
    removePolicies.splice(index, 1);
    dispatch(
      setForms({
        ...StateKey.data.form,
        PolicyByIds: removePolicyByIds,
        Policies: removePolicies,
      })
    );
  };
  function containsApis() {
    const policyId: IPolicyData[] = [];
    console.log("containsApis-apis", apis);
    const listPolicies = accessPolicyList.data?.Policies!.filter(
      (a) =>
        a.AuthType !== "keyless" &&
        !StateKey.data.form.Policies.includes(a.Id!) &&
        !apis.some((i) => i.name.some((name) => a.Apis.includes(name)))
    );
    const selectedlistPolicies = accessPolicyList.data?.Policies!.filter(
      (a) =>
        a.AuthType !== "keyless" && StateKey.data.form.Policies.includes(a.Id!)
    );

    for (const item of selectedlistPolicies!) {
      policyId.push(item);
      console.log("selectedlistPolicies", selectedlistPolicies);
      console.log("selectedlistPolicies-policyId", policyId);
    }
    for (const item of listPolicies!) {
      policyId.push(item);
      console.log("listPolicies", listPolicies);
      console.log("listPolicies-policyId", policyId);
    }

    console.log("This is the list am filtering,", policyId);
    return policyId;
  }
  function bindPolicyList() {
    return selectedApi !== ""
      ? containsApis().map((data) => [
          data.Action,
          data.Id,
          data.Name,
          data.State === "active"
            ? "Active"
            : data.State === "deny"
            ? "Access Denied"
            : "Draft",
          data.Apis.join(", "),
          data.AuthType,
        ])
      : accessPolicyList.data !== undefined &&
        accessPolicyList.data &&
        accessPolicyList.data?.Policies?.length! > 0
      ? accessPolicyList.data?.Policies.filter(
          (a) => a.AuthType !== "keyless"
        ).map((data) => [
          data.Action,
          data.Id,
          data.Name,
          data.State === "active"
            ? "Active"
            : data.State === "deny"
            ? "Access Denied"
            : "Draft",
          data.Apis.join(", "), // ? `${data.Apis.join(", ")}` : "", // data.Apis.join(", ")
          data.AuthType,
        ])
      : [];
  }
  useEffect(() => {
    if (StateKey?.data.form.KeyId?.length! > 0) {
      console.log("useEffect-apis :", apis);
      for (const p_item of StateKey?.data.form.Policies) {
        const newp = [...apis];
        const selectedlistPolicies2 = accessPolicyList.data?.Policies!.filter(
          (a) => a.AuthType !== "keyless" && p_item.includes(a.Id!)
        );
        // console.log("useEffect-apis :", apis);
        console.log("selectedlistPolicies2 :", selectedlistPolicies2);
        for (const iterator of selectedlistPolicies2!) {
          newp.push({ name: iterator.Apis, policyId: iterator.Id! });
          setApis(newp);
          console.log("useEffect-apis-i for :", apis);
        }
        // newp.push({ name: accessRights, policyId: Id });
        // setApis(newp);
        console.log("newpfor :", newp);
      }
    }
  }, [StateKey?.data.form.Policies?.length]);

  useEffect(() => {
    // alert(apis);
    bindPolicyList();
  }, [apis]);
  // useEffect(() => {
  //   // alert(apis);
  //   bindPolicyList();
  // }, [StateKey?.data.form.Policies?.length]);
  // console.log(StateKey.data.form);
  const gridTable = new Grid({
    columns: [
      {
        name: "Id",
        hidden: true,
      },
      {
        id: "Select",
        width: "6%",
        sort: false,
        formatter: (cell: string, row: any) => {
          const Id = row.cells[1].data;
          const Name = row.cells[2].data;
          const accessRights = row.cells[4].data.split(", "); // .split(",");
          // console.log("accessRights", accessRights);
          const data = StateKey.data.form?.Policies?.includes(Id);
          return h("input", {
            name: "tag_" + Id,
            id: "tag_" + Id,
            type: "checkbox",
            checked: data,
            onClick: (event: any) => {
              if (event.target!.checked) {
                handleAddClick(Id);
                setSelectedApi(Id);
                const newp = [...apis];
                newp.push({ name: accessRights, policyId: Id });
                setApis(newp);
                console.log("newp", newp);
                ToastAlert(`${Name} selected`, "success");
              } else {
                removeAccess(Id);
                const SelectedPolicyList = [...apis];
                const filterPolicyList = SelectedPolicyList.filter(
                  (item) => item.policyId !== Id
                );
                // console.log("arrrlis filterList", filterPolicyList);
                setApis(filterPolicyList);
                ToastAlert(`${Name} removed`, "warning");
              }
            },
          });
        },
      },
      { name: "Name", width: "20%" },
      { name: "Status", width: "20%", sort: false },
      { name: "Access Rights", width: "20%" },
      { name: "Auth Type", width: "20%" },
    ],
    data: () => bindPolicyList(),
    search: true,
    sort: true,
    fixedHeader: true,
    height: "30vh", // 300px
    style: {
      table: {
        width: "100%",
        fontSize: ".875rem",
      },
    },
  });
  return (
    <div>
      <div className="card mb-3">
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Apply Policy</Accordion.Header>
            <Accordion.Body>
              <div>
                <Grid {...gridTable.props} />
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );
}
