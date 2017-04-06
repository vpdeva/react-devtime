'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import devtime from './../../../app/components/devtime/devtime';
import { mount } from 'enzyme';

import { assert } from 'chai';

describe('<devtime /> tests of default settings', () => {
  var component; 

  beforeEach(() => {
    component = mount(<devtime />);
  });

  it('verify the default state are correctly', () => {
    assert.isFalse(component.node.state.play);
    assert.equal(component.node.state.time, 1500);
    assert.equal(component.node.state.timeType, 1500);
    assert.equal(component.node.state.title, '25:00 | devtime timer');
  });

  it('the options of notification should be unchecked', () => {
    assert.isFalse(component.node.refs.audio.checked);
    assert.isFalse(component.node.refs.vibrate.checked);
    assert.isFalse(component.node.refs.notification.checked);
  });

  it('should be two buttons to control the play and pause', () => {
    let buttons = component.find('div.devtime div.controlsPlay button');

    assert.equal(buttons.length, 2);

    let playButton = buttons.find('.play').node,
        stopButton = buttons.find('.stop').node;
    
    assert.isDefined(playButton);
    assert.isDefined(stopButton);
  });

  it('should be three buttons to change devtime type', () => {
    let buttons = component.find('div.devtime div.main div.types button');

    assert.equal(buttons.length, 3);

    let codeButton    = buttons.find('.code').node,
        socialButton  = buttons.find('.social').node,
        coffeeButton  = buttons.find('.coffee').node;
  
    assert.isDefined(codeButton);
    assert.isDefined(socialButton);
    assert.isDefined(coffeeButton);

    assert.equal(codeButton.innerHTML, 'Code');
    assert.equal(socialButton.innerHTML, 'Social');
    assert.equal(coffeeButton.innerHTML, 'Coffee');
  });
});

describe('<devtime /> tests behavior of buttons', () => {
  var component; 

  beforeEach(() => {
    component = mount(<devtime />);
  });

  it('when click on play the state should be changed', () => {
    let playButton = component.find('div.devtime div.controlsPlay button.play');

    assert.isFalse(component.node.state.play);
    playButton.simulate('click');
    assert.isTrue(component.node.state.play);
  });

  it('when click on social type the states should be changed', () => {
    let socialButton = component.find('div.devtime div.types button.social');

    socialButton.simulate('click');

    assert.isTrue(component.node.state.play);
    assert.equal(component.node.state.time, 300);
    assert.equal(component.node.state.timeType, 300);
    assert.equal(component.node.state.title, '05:00 | devtime timer');
  });

  it('when click on coffee type the states should be changed', () => {
    let coffeeButton = component.find('div.devtime div.types button.coffee');

    coffeeButton.simulate('click');

    assert.isTrue(component.node.state.play);
    assert.equal(component.node.state.time, 900);
    assert.equal(component.node.state.timeType, 900);
    assert.equal(component.node.state.title, '15:00 | devtime timer');
  });
});

describe('<devtime /> check if items on localStorage should be exists', () => {
  var component; 

  beforeEach(() => {
    component = mount(<devtime />);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('after checked the notification input', () => {
    let notificationInput = component.find('div.devtime div.controlsCheck #notification');

    let item = 'react-devtime-notification';

    assert.isUndefined(localStorage.getItem(item));
    notificationInput.simulate('change', { target: { checked: true } });
    assert.equal(localStorage.getItem(item), 'true');
  });

  it('after checked the audio input', () => {
    let audioInput = component.find('div.devtime div.controlsCheck #audio');

    let item = 'react-devtime-audio';
    
    assert.isUndefined(localStorage.getItem(item));
    audioInput.simulate('change', { target: { checked: true } });
    assert.equal(localStorage.getItem(item), 'true');
  });

  it('after checked the vibrate input', () => {
    let audioInput = component.find('div.devtime div.controlsCheck #vibrate');

    let item = 'react-devtime-vibrate';

    assert.isUndefined(localStorage.getItem(item));
    audioInput.simulate('change', { target: { checked: true } });
    assert.equal(localStorage.getItem(item), 'true');
  });
});