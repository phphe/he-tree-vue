import * as hp from 'helper-js'
import * as DOMUtils from './dom-utils.js'

// arg {options, event, store, opt, info, conditions, actions, doAction}
export default function ({conditions, doAction}) {
  // decision start =================================
  if (conditions['no closest'] === true){
    doAction('append to root')
  }
  else if (conditions['no closest'] === false){
    if (conditions['closest is top'] === true){
      if (conditions['on closest middle'] === true){
        doAction('insert before')
      }
      else if (conditions['on closest middle'] === false){
        if (conditions['at closest indent right'] === true){
          doAction('prepend')
        }
        else if (conditions['at closest indent right'] === false){
          if (conditions['closest is placeholder'] === true){
            doAction('insert after')
          }
          else if (conditions['closest is placeholder'] === false){
            if (conditions['closest has children excluding placeholder movingEl'] === true){
              doAction('prepend')
            }
            else if (conditions['closest has children excluding placeholder movingEl'] === false){
              doAction('insert after')
            }
          }
        }
      }
    }
    else if (conditions['closest is top'] === false){
      if (conditions['on closest middle'] === true){
        if (conditions['at closest indent right'] === false){
          if (conditions['at closest left'] === false){
            if (conditions['closest is placeholder'] === false){
              if (conditions['closest has next'] === true){
                if (conditions['closest has children excluding placeholder movingEl'] === false){
                  doAction('insert after')
                }
                else if (conditions['closest has children excluding placeholder movingEl'] === true){
                  doAction('prepend')
                }
              }
              else if (conditions['closest has next'] === false){
                if (conditions['closest has children excluding placeholder movingEl'] === true){
                  doAction('prepend')
                }
                else if (conditions['closest has children excluding placeholder movingEl'] === false){
                  doAction('insert after')
                }
              }
            }
            else if (conditions['closest is placeholder'] === true){
              doAction('nothing')
            }
          }
          else if (conditions['at closest left'] === true){
            if (conditions['closest is placeholder'] === true){
              if (conditions['no aboveBranch'] === true){
                doAction('nothing')
              }
              else if (conditions['no aboveBranch'] === false){
                doAction('after above')
              }
            }
            else if (conditions['closest is placeholder'] === false){
              if (conditions['closest has children excluding placeholder movingEl'] === false){
                doAction('insert after')
              }
              else if (conditions['closest has children excluding placeholder movingEl'] === true){
                doAction('prepend')
              }
            }
          }
        }
        else if (conditions['at closest indent right'] === true){
          if (conditions['closest is placeholder'] === false){
            if (conditions['closest has next'] === true){
              if (conditions['closest has children excluding placeholder movingEl'] === false){
                doAction('prepend')
              }
              else if (conditions['closest has children excluding placeholder movingEl'] === true){
                if (conditions['closest is top excluding placeholder'] === true){
                  doAction('insert before')
                }
                else if (conditions['closest is top excluding placeholder'] === false){
                  doAction('prepend')
                }
              }
            }
            else if (conditions['closest has next'] === false){
              doAction('prepend')
            }
          }
          else if (conditions['closest is placeholder'] === true){
            if (conditions['no aboveBranch'] === true){
              if (conditions['closest has prev'] === false){
                doAction('nothing')
              }
              else if (conditions['closest has prev'] === true){
                doAction('append to prev')
              }
            }
            else if (conditions['no aboveBranch'] === false){
              if (conditions['closest has prev'] === true){
                doAction('append to prev')
              }
              else if (conditions['closest has prev'] === false){
                doAction('nothing')
              }
            }
          }
        }
      }
      else if (conditions['on closest middle'] === false){
        if (conditions['at closest indent right'] === false){
          if (conditions['at closest left'] === false){
            if (conditions['closest is placeholder'] === false){
              if (conditions['closest has children excluding placeholder movingEl'] === true){
                doAction('prepend')
              }
              else if (conditions['closest has children excluding placeholder movingEl'] === false){
                doAction('insert after')
              }
            }
            else if (conditions['closest is placeholder'] === true){
              doAction('nothing')
            }
          }
          else if (conditions['at closest left'] === true){
            if (conditions['closest is placeholder'] === true){
              if (conditions['no aboveBranch'] === false){
                doAction('after above')
              }
              else if (conditions['no aboveBranch'] === true){
                doAction('nothing')
              }
            }
            else if (conditions['closest is placeholder'] === false){
              if (conditions['closest has next'] === false){
                if (conditions['closest has children excluding placeholder movingEl'] === false){
                  doAction('insert after')
                }
                else if (conditions['closest has children excluding placeholder movingEl'] === true){
                  doAction('prepend')
                }
              }
              else if (conditions['closest has next'] === true){
                if (conditions['closest has children excluding placeholder movingEl'] === true){
                  doAction('prepend')
                }
                else if (conditions['closest has children excluding placeholder movingEl'] === false){
                  doAction('insert after')
                }
              }
            }
          }
        }
        else if (conditions['at closest indent right'] === true){
          if (conditions['closest is placeholder'] === true){
            if (conditions['no aboveBranch'] === true){
              if (conditions['closest has prev'] === false){
                doAction('nothing')
              }
              else if (conditions['closest has prev'] === true){
                doAction('append to prev')
              }
            }
            else if (conditions['no aboveBranch'] === false){
              if (conditions['closest has prev'] === true){
                doAction('append to prev')
              }
              else if (conditions['closest has prev'] === false){
                doAction('nothing')
              }
            }
          }
          else if (conditions['closest is placeholder'] === false){
            doAction('prepend')
          }
        }
      }
    }
  }
  // decision end =================================
}
