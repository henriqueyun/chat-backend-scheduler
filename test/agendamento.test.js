require('dotenv').config()
const server = require('../src/index')

const chai = require('chai')
const chai_http = require('chai-http')

const expect = chai.expect
chai.use(chai_http)

const request = () => {
  return chai.request(server)
}

describe('Xet Scheduling Tests', function () {
  it("Post Xet", (done) => {    
    request()
    .post('/xet')
    .send({
      owner: 'admin',
      title: 'admin xet',
      startTime: '2016-01-01 00:00:00+00:00',
      endTime: '2016-01-01 00:30:00+00:0'
    })
    .end((err, res) => {
      expect(res).to.have.status(200);
      done()  
    })
  })

  it("Get All Xet", (done) => {    
    request()
    .get('/xet/all')
    .end((err, res) => {
      console.log(res)
      expect(res).to.have.status(200);
      done()  
    })
  })
})