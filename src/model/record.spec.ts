import test from "ava-ts"
import { before, after, TestRecordModel } from "../test_integration/model_scenario"

test.before(before)

let sampleRecordId: string

test.serial("Create Record", async t => {
    
    let sampleRecordData = {
        name: "john-doe",
        email: "anonymous@anon.com"
    }

    let doc = new TestRecordModel(sampleRecordData)
    t.is(doc.validateSync(), undefined)
    await doc.save()
    sampleRecordId = doc.id
})

test.serial("Read Record", async t => {
    let doc = await TestRecordModel.findOne({ _id: sampleRecordId })
    t.truthy(doc)
})

test.serial("Update Record", async t => {

    let sampleRecordUpdateData = {
        name: "jane-doe",
        email: "anon@anon.com"
    }

    let doc = await TestRecordModel.findOneAndUpdate({ _id: sampleRecordId }, sampleRecordUpdateData)
    t.is(doc.validateSync(), undefined)
    await doc.save()
})

test.serial("Delete Record", async t => {
    let doc = await TestRecordModel.findOne({ _id: sampleRecordId })
    await doc.remove()
    let searchDoc = await TestRecordModel.findOne({ _id: sampleRecordId })
    t.is(searchDoc, null)
})

test.after(after)
