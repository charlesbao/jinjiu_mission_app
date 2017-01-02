/**
 * Created by chalresbao on 16/11/24.
 */
import WebAPI from './WebAPI'
import AV from 'leancloud-storage'
export default {
    queryUserMission(callback){
        WebAPI.queryUserMissions(AV.User.current(),function(result){
            callback(result)
        })
    },
    queryMissions(page,filterIndex,callback){
        const [topFilter,subFilter] = filterIndex
        switch (topFilter) {
            case 0:
            default:
                WebAPI.queryMissionsByDate(page, function (result) {
                    callback(result)
                });
                break;
            case 1:
                WebAPI.queryMissionsByPrice(page, subFilter, function (result) {
                    callback(result)
                });
                break;
            case 2:
                WebAPI.queryMissionsByAttribute(page, subFilter, function (result) {
                    callback(result)
                });
                break;
        }
    },
    queryMissionById(missionId,callback){
        WebAPI.queryMissionById(missionId,function(mission){
            callback(mission)
        })
    },
    queryCurrentMissionComments(missionId,callback){
        WebAPI.queryComments(missionId, function(result){
            callback(result)
        })
    },

    queryRelatedMissions(missionId,attribute,callback){
        WebAPI.queryRelatedMissions(missionId,attribute, function(result){
            callback(result)
        })
    }
};

