// import { IApiData } from "../../types/api/index";
import { IGetPolicyByIdData } from "../../../store/features/gateway/policy/create";
import apiFactory from "../../../utils/api";

export function policyListService(currentPage: number, pageSize: number) {
  return apiFactory().get(
    `${process.env.REACT_APP_GATEWAY_API}Policy?pageNum=${currentPage}&pageSize=${pageSize}`
  );
}
export function addPolicyService(data: IGetPolicyByIdData) {
  return apiFactory().post(`${process.env.REACT_APP_GATEWAY_API}Policy`, data);
}
export function getPolicyByIdService(id: string) {
  return apiFactory().get(`${process.env.REACT_APP_GATEWAY_API}Policy/` + id);
}
export function updatePolicyService(data: IGetPolicyByIdData) {
  return apiFactory().put(`${process.env.REACT_APP_GATEWAY_API}Policy`, data);
}
export function deletePolicyService(id: string) {
  return apiFactory().delete(
    `${process.env.REACT_APP_GATEWAY_API}Policy/` + id
  );
}
