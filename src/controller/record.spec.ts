import test from "ava"
import { before, after, TestRecordController, makeResponse, dummyNext } from "../test_integration/controller_scenario"
import { ControllerRequest } from "./interface/request"

test.before(before)

let sampleRecordId: string

test.serial("Set Record", async t => {
    let req = {
        headers: {},
        body: {
            name: "john-doe",
            email: "anon@anon.com"
        },
        params: {}
    } as ControllerRequest
    let res = makeResponse((obj) => {
        t.is(res.code, 200)
        t.truthy(obj.record)
        sampleRecordId = obj.record.id
    })
    await TestRecordController.setRecord(req, res, dummyNext)
})

test.serial("Get Record", async t => {
    let req = {
        headers: {},
        body: {},
        params: {
            id: sampleRecordId
        }
    } as ControllerRequest
    let res = makeResponse((obj) => t.is(res.code, 200))
    await TestRecordController.getRecord(req, res, dummyNext)
})

test.after(after)
