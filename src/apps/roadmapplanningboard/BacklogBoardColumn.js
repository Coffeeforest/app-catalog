(function () {
    var Ext = window.Ext4 || window.Ext;

    Ext.define('Rally.apps.roadmapplanningboard.BacklogBoardColumn', {
        extend: 'Rally.apps.roadmapplanningboard.PlanningBoardColumn',
        alias: 'widget.backlogplanningcolumn',
        inject: ['planStore'],
        require: ['Rally.data.QueryFilter'],
        config: {
            filterable: true,
            roadmap: null,
            columnHeaderConfig: {
                headerTpl: 'Backlog'
            },
            baseFilter: new Rally.data.QueryFilter({
                property: 'ActualEndDate',
                operator: '=',
                value: 'null'
            })
        },

        getColumnIdentifier: function () {
            return "roadmapplanningboardbacklogcolumn";
        },

        isMatchingRecord: function (featureRecord) {
            var _this = this;

            return !this.roadmap || (this.planStore.findBy(function (planRecord) {
                return _this.roadmap.plans().getById(planRecord.getId()) &&
                    (_.find(planRecord.get('features'), function (planFeatureRecord) {
                        return featureRecord.getId() === parseInt(planFeatureRecord.id, 10);
                    }));
            }, this)) === -1;
        },

        getAllFetchFields: function () {
            return ['true'];
        }
    });

})();
