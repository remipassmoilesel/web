/*global $, app, me, client*/
"use strict";

var HumanView = require('human-view');
var templates = require('../templates');
var ContactListItem = require('../views/contactListItem');
var MUCListItem = require('../views/mucListItem');
var CallView = require('../views/call');

var ContactRequestItem = require('../views/contactRequest');


module.exports = HumanView.extend({
    template: templates.body,
    initialize: function () {
        this.listenTo(app.state, 'change:title', this.handleTitle);
        app.desktop.updateBadge('');
        app.state.on('change:deviceID', function () {
            console.log('DEVICE ID>>>', app.state.deviceID);
        });

        app.state.bind('change:connected', this.connectionChange, this);
    },
    events: {
        'click a[href]': 'handleLinkClick',
        'click .embed': 'handleEmbedClick',
        'click .reconnect': 'handleReconnect',
        'click .logout': 'handleLogout',
        'keydown #addcontact': 'keyDownAddContact',
        'keydown #joinmuc': 'keyDownJoinMUC',
        'blur #me .status': 'handleStatusChange',
        'keydown .status': 'keyDownStatus'
    },
    classBindings: {
        connected: '#topbar',
        cacheStatus: '#updateBar',
        hasActiveCall: '#wrapper',
        currentPageIsSettings: '.settings'
    },
    render: function () {
        $('head').append(templates.head());
        $('body').removeClass('aux');
        this.renderAndBind();
        this.renderCollection(me.contacts, ContactListItem, this.$('#roster nav'));
        this.renderCollection(me.mucs, MUCListItem, this.$('#bookmarks nav'));
        this.renderCollection(me.contactRequests, ContactRequestItem, this.$('#contactrequests'));

        this.$joinmuc = this.$('#joinmuc');
        this.$addcontact = this.$('#addcontact');
        this.$meStatus = this.$('#footer .status');

        this.registerBindings(me, {
            textBindings: {
                displayName: '#me .name',
                status: '#me .status',
                organization: '#organization #orga_name',
            },
            srcBindings: {
                avatar: '#me .avatar'
            }
        });
        return this;
    },
    handleReconnect: function (e) {
        client.connect();
    },
    handleLinkClick: function (e) {
        var t = $(e.target);
        var aEl = t.is('a') ? t[0] : t.closest('a')[0];
        var local = window.location.host === aEl.host;
        var path = aEl.pathname.slice(1);

        if (local) {
            e.preventDefault();
            app.navigate(path);
            return false;
        }
    },
    handleEmbedClick: function (e) {
        if (e.shiftKey) {
            e.preventDefault();
            $(e.currentTarget).toggleClass('collapsed');
        }
    },
    handleTitle: function (e) {
        document.title = app.state.title;
        app.desktop.updateBadge(app.state.badge);
    },
    handleStatusChange: function (e) {
        var text = e.target.textContent;
        me.status = text;
        client.sendPresence({
            status: text,
            caps: client.disco.caps
        });
    },
    keyDownStatus: function (e) {
        if (e.which === 13 && !e.shiftKey) {
            e.target.blur();
            return false;
        }
    },
    handleLogout: function (e) {
        app.navigate('/logout');
    },
    handleAddContact: function (e) {
        e.preventDefault();

        var contact = this.$('#addcontact').val();
        if (contact.indexOf('@') == -1 && SERVER_CONFIG.domain)
            contact += '@' + SERVER_CONFIG.domain;
        if (contact) {
            app.api.sendPresence({to: contact, type: 'subscribe'});
        }
        this.$('#addcontact').val('');

        return false;
    },
    keyDownAddContact: function (e) {
        if (e.which === 13 && !e.shiftKey) {
            this.handleAddContact(e);
            return false;
        }
    },
    handleJoinMUC: function (e) {
        e.preventDefault();

        var mucjid = this.$('#joinmuc').val();
        this.$('#joinmuc').val('');
        if (mucjid.indexOf('@') == -1 && SERVER_CONFIG.muc)
            mucjid += '@' + SERVER_CONFIG.muc;
        me.mucs.add({
            id: mucjid,
            name: mucjid,
            jid: new app.JID(mucjid),
            nick: me.nick,
            autoJoin: true
        });
        me.mucs.save();
        me.mucs.get(mucjid).join(true);
    },
    keyDownJoinMUC: function (e) {
        if (e.which === 13 && !e.shiftKey) {
            this.handleJoinMUC(e);
            return false;
        }
    },
    connectionChange: function () {
        if (app.state.connected) {
            this.$joinmuc.attr("disabled", false);
            this.$addcontact.attr("disabled", false);
            this.$meStatus.attr("contenteditable", true);
        } else {
            this.$joinmuc.attr("disabled", "disabled");
            this.$addcontact.attr("disabled", "disabled");
            this.$meStatus.attr("contenteditable", false);
        }
    }
});
