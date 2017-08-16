'use strict';

import React from 'react';

import {
  AppRegistry,
  View,
  StyleSheet,
  ListView,
  Image,
  Text
} from 'react-native';

import {
    LazyloadListView
} from 'react-native-lazyload';

import { Metrics, Images } from '../../App/Themes';

var CollectionView = React.createClass({
    groupItems: function(items, itemsPerRow) {
        var itemsGroups = [];
        var group = [];
        var flag=false;
        items.forEach(function(item) {
          if(flag)
          {
            if (group.length === itemsPerRow) {
              itemsGroups.push(group);
              group = [item];
            } else {
              group.push(item);
            }
          }
          else {
            flag=true;
          }
        });
        if (group.length > 0) {
          itemsGroups.push(group);
        }
        itemsGroups.unshift([items[0]]);
        return itemsGroups;
    },
    renderGroup: function(group) {
      var that = this;
      if(group.length==1&&this.state.flag)
      {
        this.state.flag=false;
        var items = group.map(function(item, index) {
          return that.props.renderHeader(item, that.props.openModal, that.props.mCon);
        });
        return (
          <View>
            {items}
          </View>
        );
      }
      else {
        var items = group.map(function(item, index) {
          return that.props.renderItem(item, that.props.openModal, index, that.props.mCon);
        });
        return (
          <View style={styles.group}>
            {items}
          </View>
        );
      }
    },
    render: function() {
        this.state={flag: true};
        var groups = this.groupItems(this.props.items, this.props.itemsPerRow);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return (<LazyloadListView
          name="lazyload-list"
          {...this.props}
          renderRow={this.renderGroup}
          dataSource={ds.cloneWithRows(groups)}
        />);
    },
});


var styles = StyleSheet.create({
  group: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    paddingHorizontal: 25,
    paddingBottom: 8
  }
});

module.exports = CollectionView;
