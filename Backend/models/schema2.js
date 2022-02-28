const mongoose = require('mongoose');


const PostSchema = mongoose.Schema({
    "_id": {
        "type": "ObjectId",
        "properties": {
          "$oid": {
            "type": "string"
          }
        }
      },
      "block": {
        "type": "object",
        "required": [],
        "properties": {
          "header": {
            "type": "object",
            "required": [],
            "properties": {
              "id": {
                "type": "object",
                "required": [],
                "properties": {
                  "data": {
                    "type": "string"
                  }
                }
              },
              "timestamp": {
                "type": "object",
                "required": [],
                "properties": {
                  "data": {
                    "type": "number"
                  }
                }
              },
              "previousBlockHash": {
                "type": "object",
                "required": [],
                "properties": {
                  "data": {
                    "type": "string"
                  }
                }
              },
              "author": {
                "type": "object",
                "required": [],
                "properties": {
                  "signature": {
                    "type": "object",
                    "required": [],
                    "properties": {
                      "data": {
                        "type": "string"
                      }
                    }
                  },
                  "keyPub": {
                    "type": "object",
                    "required": [],
                    "properties": {
                      "rawData": {
                        "type": "string"
                      }
                    }
                  }
                }
              },
              "height": {
                "type": "string"
              }
            }
          }
        }
      },
      "branch": {
        "type": "string"
      },
      "branchPath": {
        "type": "object",
        "required": [],
        "properties": {
          "branchIds": {
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "blockNumbers": {
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "branchId": {
            "type": "string"
          },
          "blockNumber": {
            "type": "string"
          }
        }
      },
      "score": {
        "type": "object",
        "required": [],
        "properties": {
          "$numberLong": {
            "type": "string"
          }
        }
      },
      "receptionTime": {
        "type": "object",
        "required": [],
        "properties": {
          "data": {
            "type": "number"
          }
        }
      },
      "balances": {
        "type": "array",
        "items": {
          "type": "object",
          "required": [],
          "properties": {
            "keyPub": {
              "type": "object",
              "required": [],
              "properties": {
                "rawData": {
                  "type": "string"
                }
              }
            },
            "value": {
              "type": "object",
              "required": [],
              "properties": {
                "value": {
                  "type": "string"
                }
              }
            },
            "enthalpyBegin": {
              "type": "string"
            },
            "enthalpyEnd": {
              "type": "string"
            }
          }
        }
      },
      "previousAssemblyId": {
        "type": "object",
        "required": [],
        "properties": {
          "data": {
            "type": "string"
          }
        }
      }
    },
    {
      collection: "blocks"
    }
    );

module.exports = mongoose.model('blocks', PostSchema);