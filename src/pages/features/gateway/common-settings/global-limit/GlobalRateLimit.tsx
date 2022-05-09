import React, { useEffect, useState } from "react";
import { Accordion, Row, Col, Form } from "react-bootstrap";
import Spinner from "../../../../../components/loader/Loader";
import { regexForNumber } from "../../../../../resources/gateway/api/api-constants";
import { IKeyCreateState } from "../../../../../store/features/gateway/key/create";
import {
  setForms,
  setFormErrors,
} from "../../../../../store/features/gateway/key/create/slice";
import { IPolicyCreateState } from "../../../../../store/features/gateway/policy/create";
import {
  setForm,
  setFormError,
} from "../../../../../store/features/gateway/policy/create/slice";

import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";

interface IProps {
  state?: IPolicyCreateState;
  keystate?: IKeyCreateState;
  current: string;
  message?: string;
}

export default function GlobalRateLimit(props: IProps) {
  const dispatch = useAppDispatch();
  const states = useAppSelector((RootState) => RootState.createKeyState);
  const state: IPolicyCreateState = useAppSelector(
    (RootStates) => RootStates.createPolicyState
  );

  function validateForm(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    switch (name) {
      case "rate":
        props.current === "policy"
          ? dispatch(
              setFormError({
                ...state.data.errors,
                Rate: regexForNumber.test(value) ? "" : "Enter only Numbers",
              })
            )
          : dispatch(
              setFormErrors({
                ...states.data.errors,
                Rate: regexForNumber.test(value) ? "" : "Enter only Numbers",
              })
            );
        break;
      case "per":
        props.current === "policy"
          ? dispatch(
              setFormError({
                ...state.data.errors,
                Per: regexForNumber.test(value) ? "" : "Enter only Numbers",
              })
            )
          : dispatch(
              setFormErrors({
                ...states.data.errors,
                Per: regexForNumber.test(value) ? "" : "Enter only Numbers",
              })
            );
        break;
      case "throttle_retry_limit":
        props.current === "policy"
          ? dispatch(
              setFormError({
                ...state.data.errors,
                ThrottleRetries: regexForNumber.test(value)
                  ? ""
                  : "Enter only Numbers",
              })
            )
          : dispatch(
              setFormErrors({
                ...states.data.errors,
                ThrottleRetries: regexForNumber.test(value)
                  ? ""
                  : "Enter only Numbers",
              })
            );
        break;
      case "throttle_interval":
        props.current === "policy"
          ? dispatch(
              setFormError({
                ...state.data.errors,
                ThrottleInterval: regexForNumber.test(value)
                  ? ""
                  : "Enter only Numbers",
              })
            )
          : dispatch(
              setFormErrors({
                ...states.data.errors,
                ThrottleInterval: regexForNumber.test(value)
                  ? ""
                  : "Enter only Numbers",
              })
            );
        break;
      case "quota_max":
        props.current === "policy"
          ? dispatch(
              setFormError({
                ...state.data.errors,
                Quota: regexForNumber.test(value) ? "" : "Enter only Numbers",
              })
            )
          : dispatch(
              setFormErrors({
                ...states.data.errors,
                Quota: regexForNumber.test(value) ? "" : "Enter only Numbers",
              })
            );
        break;
      default:
        break;
    }
  }

  const [rate, setRate] = useState(false);
  const [throttle, setThrottle] = useState(true);
  const [quota, setQuota] = useState(true);
  // const [throttleRetry, setThrottleRetry] = useState("Disabled throttling");
  // const [throttleInterval, setThrottleInterval] = useState(
  //   "Disabled throttling"
  // );
  // const [quotaPerPeriod, setQuotaPerPeriod] = useState("Unlimited");

  const handlerateclick = (event: any) => {
    event.preventDefault();
    validateForm(event);
    let fieldValue;
    const fieldName = event.target.getAttribute("name");
    if (fieldName === "quota_renews") {
      switch (event.target.value) {
        case "1 hour":
          fieldValue = 3600;
          console.log(fieldValue);
          break;
        case "6 hour":
          fieldValue = 21_600;
          break;
        case "12 hour":
          fieldValue = 43_200;
          break;
        case "1 week":
          fieldValue = 604_800;
          break;
        case "1 months":
          fieldValue = 2.628e6;
          break;
        case "6 months":
          fieldValue = 1.577e7;
          break;
        case "12 months":
          fieldValue = 3.154e7;
          break;
      }
    } else {
      fieldValue = event.target.value;
    }

    switch (fieldName) {
      case "rate":
        props.current === "policy"
          ? dispatch(setForm({ ...state.data.form, Rate: fieldValue }))
          : dispatch(setForms({ ...states.data.form, Rate: fieldValue }));
        break;
      case "per":
        props.current === "policy"
          ? dispatch(setForm({ ...state.data.form, Per: fieldValue }))
          : dispatch(setForms({ ...states.data.form, Per: fieldValue }));
        break;
      case "throttle_retry_limit":
        props.current === "policy"
          ? dispatch(
              setForm({ ...state.data.form, ThrottleRetries: fieldValue })
            )
          : dispatch(
              setForms({ ...states.data.form, ThrottleRetries: fieldValue })
            );
        break;
      case "throttle_interval":
        props.current === "policy"
          ? dispatch(
              setForm({ ...state.data.form, ThrottleInterval: fieldValue })
            )
          : dispatch(
              setForms({ ...states.data.form, ThrottleInterval: fieldValue })
            );
        break;
      case "quota_max":
        props.current === "policy"
          ? dispatch(setForm({ ...state.data.form, MaxQuota: fieldValue }))
          : dispatch(setForms({ ...states.data.form, Quota: fieldValue }));
        break;
      case "quota_renews":
        props.current === "policy"
          ? dispatch(setForm({ ...state.data.form, MaxQuota: fieldValue }))
          : dispatch(
              setForms({ ...states.data.form, QuotaRenewalRate: fieldValue })
            );
        break;
    }
  };

  useEffect(() => {
    function setRateValue() {
      if (rate === true) {
        console.log("Rate");
        props.current === "policy"
          ? dispatch(
              setForm({
                ...state.data.form,
                Rate: -1,
                Per: -1,
              })
            )
          : dispatch(
              setForms({
                ...states.data.form,
                Rate: -1,
                Per: -1,
              })
            );
      } else {
        props.current === "policy"
          ? dispatch(
              setForm({
                ...state.data.form,
                Rate: 0,
                Per: 0,
              })
            )
          : dispatch(
              setForms({
                ...states.data.form,
                Rate: 0,
                Per: 0,
              })
            );
      }
    }
    setRateValue();
  }, [rate]);

  useEffect(() => {
    function setThrottleValue() {
      if (throttle === true) {
        console.log("throttle");
        props.current === "policy"
          ? dispatch(
              setForm({
                ...state.data.form,
                ThrottleInterval: -1,
                ThrottleRetries: -1,
              })
            )
          : dispatch(
              setForms({
                ...states.data.form,
                ThrottleInterval: -1,
                ThrottleRetries: -1,
              })
            );
      } else {
        props.current === "policy"
          ? dispatch(
              setForm({
                ...state.data.form,
                ThrottleInterval: 0,
                ThrottleRetries: 0,
              })
            )
          : dispatch(
              setForms({
                ...states.data.form,
                ThrottleInterval: 0,
                ThrottleRetries: 0,
              })
            );
      }
    }
    setThrottleValue();
  }, [throttle]);

  useEffect(() => {
    function setQuotaValue() {
      if (quota === true) {
        console.log("Quota");
        props.current === "policy"
          ? dispatch(
              setForm({
                ...state.data.form,
                MaxQuota: -1,
                QuotaRate: -1,
              })
            )
          : dispatch(
              setForms({
                ...states.data.form,
                Quota: -1,
                QuotaRenewalRate: -1,
              })
            );
      } else {
        props.current === "policy"
          ? dispatch(
              setForm({
                ...state.data.form,
                MaxQuota: 0,
                QuotaRate: 0,
              })
            )
          : dispatch(
              setForms({
                ...states.data.form,
                Quota: 0,
                QuotaRenewalRate: 0,
              })
            );
      }
    }
    setQuotaValue();
  }, [quota]);

  useEffect(() => {
    function setInitialValue() {
      props.current === "policy"
        ? dispatch(
            setForm({
              ...state.data.form,
              ThrottleInterval: -1,
              ThrottleRetries: -1,
              MaxQuota: -1,
              QuotaRate: -1,
            })
          )
        : dispatch(
            setForms({
              ...states.data.form,
              ThrottleInterval: -1,
              ThrottleRetries: -1,
              Quota: -1,
              QuotaRenewalRate: -1,
            })
          );
    }
    setInitialValue();
  }, []);

  // function handleThrottleChange(evt: any) {
  //   setThrottle(evt.target.checked);
  //   if (throttle === false) {
  //     setThrottleRetry("Disabled throttling");
  //     setThrottleInterval("Disabled throttling");
  //   } else {
  //     setThrottleRetry("Enter retry limit");
  //     setThrottleInterval("Enter interval");
  //   }
  // }

  // function handleQuotaChange(evt: any) {
  //   setQuota(evt.target.checked);
  //   if (quota === false) {
  //     setQuotaPerPeriod("Unlimited");
  //   } else {
  //     setQuotaPerPeriod("Enter request per period");
  //   }
  // }

  return (
    <>
      {state.loading === false ? (
        <div className="card">
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Global Limits and Quota</Accordion.Header>

              <Accordion.Body>
                <Row>
                  <Col md="4">
                    {props.current === "globalKey-applyPolicy" ? (
                      <Form.Group className="mb-3">
                        <Form.Label className="mt-2">
                          <b>Rate Limiting</b>
                        </Form.Label>
                        <div
                          className="mr-4 pt-3 pb-3 mt-2 border border-4 rounded-4 pl-2"
                          style={{ background: "#ADD8E6" }} // #96DED1
                        >
                          Rate Limit {props.message}
                        </div>
                      </Form.Group>
                    ) : (
                      <Form.Group className="mb-3">
                        <Form.Label className="mt-2">
                          <b>Rate Limiting</b>
                        </Form.Label>
                        <Form.Check
                          type="switch"
                          id="disableGlobalRate"
                          name="GlobalLimit.IsDisabled"
                          label="Disable rate limiting"
                          // checked={rate}
                          className="ml-4"
                          onChange={(e: any) => setRate(e.target.checked)}
                        />
                        <Form.Label className="mt-3">Rate</Form.Label>
                        <br />

                        <Form.Control
                          className="mt-2"
                          type="text"
                          id="rate"
                          placeholder="Enter Request per period"
                          // onChange={(e: any) => validateForm(e)}
                          onChange={(e: any) => handlerateclick(e)}
                          name="rate"
                          value={
                            props.current === "policy"
                              ? state.data.form.Rate === -1
                                ? "Unlimited"
                                : state.data.form.Rate
                              : states.data.form.Rate === -1
                              ? "Unlimited"
                              : states.data.form.Rate
                          }
                          isInvalid={
                            props.current === "policy"
                              ? !!state.data.errors?.Rate
                              : !!states.data.errors?.Rate
                          }
                          isValid={
                            props.current === "policy"
                              ? !state.data.errors?.Rate
                              : !states.data.errors?.Rate
                          }
                          disabled={rate}
                        />
                        <Form.Control.Feedback type="invalid">
                          {" "}
                          {props.current === "policy"
                            ? state.data.errors?.Rate
                            : states.data.errors?.Rate}
                        </Form.Control.Feedback>
                        <Form.Label className="mt-3">Per (Seconds)</Form.Label>
                        <br />
                        <Form.Control
                          className="mt-2"
                          type="text"
                          id="per"
                          placeholder="Enter time"
                          onChange={(e: any) => handlerateclick(e)}
                          name="per"
                          value={
                            props.current === "policy"
                              ? state.data.form.Per === -1
                                ? "Unlimited"
                                : state.data.form.Per
                              : states.data.form.Per === -1
                              ? "Unlimited"
                              : states.data.form.Per
                          }
                          isInvalid={
                            props.current === "policy"
                              ? !!state.data.errors?.Per
                              : !!states.data.errors?.Per
                          }
                          isValid={
                            props.current === "policy"
                              ? !state.data.errors?.Per
                              : !states.data.errors?.Per
                          }
                          disabled={rate}
                        />
                        <Form.Control.Feedback type="invalid">
                          {props.current === "policy"
                            ? state.data.errors?.Per
                            : states.data.errors?.Per}
                        </Form.Control.Feedback>
                      </Form.Group>
                    )}
                  </Col>
                  <Col md="4">
                    {props.current === "globalKey-applyPolicy" ? (
                      <Form.Group className="mb-3">
                        <Form.Label className="mt-2">
                          <b>Throttling</b>
                        </Form.Label>
                        <div
                          className="mr-4 pt-3 pb-3 mt-2 border border-4 rounded-4 pl-2 "
                          style={{ background: "#ADD8E6" }}
                        >
                          Throttling {props.message}
                        </div>
                      </Form.Group>
                    ) : (
                      <Form.Group className="mb-3">
                        <Form.Label className="mt-2">
                          <b>Throttling</b>
                        </Form.Label>
                        <Form.Check
                          type="switch"
                          id="disableThrottling"
                          name="Throttling.IsDisabled"
                          label="Disable Throttling"
                          checked={throttle}
                          className="ml-4"
                          onChange={(e: any) => setThrottle(e.target.checked)}
                        />
                        <Form.Label className="mt-3">
                          Throttle retry limit
                        </Form.Label>
                        <br />
                        <Form.Control
                          className="mt-2"
                          type="text"
                          id="retry"
                          // placeholder={throttleRetry}
                          name="throttle_retry_limit"
                          value={
                            props.current === "policy"
                              ? state.data.form.ThrottleRetries === -1
                                ? "Disabled Throttling"
                                : state.data.form.ThrottleRetries
                              : states.data.form.ThrottleRetries === -1
                              ? "Disabled Throttling"
                              : states.data.form.ThrottleRetries
                          }
                          onChange={(e: any) => handlerateclick(e)}
                          // value={throttleDefault}
                          isInvalid={
                            props.current === "policy"
                              ? !!state.data.errors?.ThrottleRetries
                              : !!states.data.errors?.ThrottleRetries
                          }
                          isValid={
                            props.current === "policy"
                              ? !state.data.errors?.ThrottleRetries
                              : !states.data.errors?.ThrottleRetries
                          }
                          disabled={throttle}
                        />
                        <Form.Control.Feedback type="invalid">
                          {props.current === "policy"
                            ? state.data.errors?.ThrottleRetries
                            : states.data.errors?.ThrottleRetries}
                        </Form.Control.Feedback>
                        <Form.Label className="mt-3">
                          Throttle interval
                        </Form.Label>
                        <br />
                        <Form.Control
                          className="mt-2"
                          type="text"
                          id="interval"
                          name="throttle_interval"
                          value={
                            props.current === "policy"
                              ? state.data.form.ThrottleInterval === -1
                                ? "Disabled Throttling"
                                : state.data.form.ThrottleInterval
                              : states.data.form.ThrottleInterval === -1
                              ? "Disabled Throttling"
                              : states.data.form.ThrottleInterval
                          }
                          // placeholder={throttleInterval}
                          onChange={(e: any) => handlerateclick(e)}
                          isInvalid={
                            props.current === "policy"
                              ? !!state.data.errors?.ThrottleInterval
                              : !!states.data.errors?.ThrottleInterval
                          }
                          isValid={
                            props.current === "policy"
                              ? !state.data.errors?.ThrottleInterval
                              : !states.data.errors?.ThrottleInterval
                          }
                          disabled={throttle}
                        />
                        <Form.Control.Feedback type="invalid">
                          {props.current === "policy"
                            ? state.data.errors?.ThrottleInterval
                            : states.data.errors?.ThrottleInterval}
                        </Form.Control.Feedback>
                      </Form.Group>
                    )}
                  </Col>
                  <Col md="4">
                    {props.current === "globalKey-applyPolicy" ? (
                      <Form.Group className="mb-3">
                        <Form.Label className="mt-2">
                          <b>Usage Quota</b>
                        </Form.Label>
                        <div
                          className="mr-4 pt-3 pb-3 mt-2 border border-4 rounded-4 pl-2"
                          style={{ background: "#ADD8E6" }}
                        >
                          Usage Quota {props.message}
                        </div>
                      </Form.Group>
                    ) : (
                      <Form.Group className="mb-3">
                        <Form.Label className="mt-2">
                          <b>Usage Quota</b>
                        </Form.Label>
                        <Form.Check
                          type="switch"
                          id="unlimitedRequests"
                          name="unlimitedRequests.IsDisabled"
                          label="Unlimited requests"
                          checked={quota}
                          className="ml-4"
                          onChange={(e: any) => setQuota(e.target.checked)}
                        />
                        <Form.Label className="mt-3">
                          Max requests per period
                        </Form.Label>
                        <br />
                        <Form.Control
                          className="mt-2"
                          type="text"
                          id="quotaPer"
                          // placeholder={quotaPerPeriod}
                          onChange={(e: any) => handlerateclick(e)}
                          name="quota_max"
                          value={
                            props.current === "policy"
                              ? state.data.form.MaxQuota === -1
                                ? "Unlimited"
                                : state.data.form.MaxQuota
                              : states.data.form.Quota === -1
                              ? "Unlimited"
                              : states.data.form.Quota
                          }
                          isInvalid={
                            props.current === "policy"
                              ? !!state.data.errors?.Quota
                              : !!states.data.errors?.Quota
                          }
                          isValid={
                            props.current === "policy"
                              ? !state.data.errors?.Quota
                              : !states.data.errors?.Quota
                          }
                          disabled={quota}
                        />
                        <Form.Control.Feedback type="invalid">
                          {" "}
                          {props.current === "policy"
                            ? state.data.errors?.Quota
                            : states.data.errors?.Quota}
                        </Form.Control.Feedback>
                        <Form.Label className="mt-3">
                          Quota resets every
                        </Form.Label>
                        <Form.Select
                          className="mt-2"
                          style={{ height: 46 }}
                          disabled={quota}
                          name="quota_renews"
                          onChange={(e: any) => handlerateclick(e)}
                        >
                          <option>never</option>
                          <option>1 hour</option>
                          <option>6 hour</option>
                          <option>12 hour</option>
                          <option>1 week</option>
                          <option>1 month</option>
                          <option>6 months</option>
                          <option>12 months</option>
                        </Form.Select>
                      </Form.Group>
                    )}
                  </Col>
                </Row>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
}
