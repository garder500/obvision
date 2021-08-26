-- Adminer 4.8.1 MySQL 5.5.68-MariaDB dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS `bans`;
CREATE TABLE `bans` (
  `ai` int(11) NOT NULL AUTO_INCREMENT,
  `guildid` varchar(65) NOT NULL,
  `userid` varchar(65) NOT NULL,
  `timestamp` time NOT NULL,
  PRIMARY KEY (`ai`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `commands`;
CREATE TABLE `commands` (
  `ai` int(11) NOT NULL AUTO_INCREMENT,
  `guildid` varchar(65) NOT NULL,
  `name` varchar(65) NOT NULL,
  `category` varchar(65) NOT NULL DEFAULT 'true',
  `command` varchar(65) NOT NULL DEFAULT 'true',
  PRIMARY KEY (`ai`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


SET NAMES utf8mb4;

DROP TABLE IF EXISTS `emote`;
CREATE TABLE `emote` (
  `ai` double NOT NULL AUTO_INCREMENT,
  `id` varchar(65) CHARACTER SET utf8mb4 NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 NOT NULL,
  `count` double NOT NULL,
  `guildid` varchar(65) NOT NULL,
  `userid` varchar(65) NOT NULL,
  `timestamp` date NOT NULL,
  PRIMARY KEY (`ai`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `guilds`;
CREATE TABLE `guilds` (
  `ai` double NOT NULL AUTO_INCREMENT,
  `id` varchar(65) NOT NULL,
  PRIMARY KEY (`ai`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `invites`;
CREATE TABLE `invites` (
  `ai` double NOT NULL AUTO_INCREMENT,
  `id` varchar(65) NOT NULL,
  `guildid` varchar(65) NOT NULL,
  `invited` varchar(65) NOT NULL,
  `timestamp` date NOT NULL,
  PRIMARY KEY (`ai`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `logs`;
CREATE TABLE `logs` (
  `ai` int(11) NOT NULL AUTO_INCREMENT,
  `guildid` varchar(65) NOT NULL,
  `channelid` varchar(65) NOT NULL,
  `type` int(11) NOT NULL,
  PRIMARY KEY (`ai`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `suggestion`;
CREATE TABLE `suggestion` (
  `ai` int(11) NOT NULL AUTO_INCREMENT,
  `channelid` varchar(65) NOT NULL,
  `guildid` varchar(65) NOT NULL,
  PRIMARY KEY (`ai`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `support`;
CREATE TABLE `support` (
  `ai` int(11) NOT NULL AUTO_INCREMENT,
  `guildid` varchar(65) NOT NULL,
  `role` varchar(65) NOT NULL,
  PRIMARY KEY (`ai`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `userconfig`;
CREATE TABLE `userconfig` (
  `ai` int(11) NOT NULL AUTO_INCREMENT,
  `userid` varchar(65) NOT NULL,
  `pitch` int(11) NOT NULL DEFAULT '0',
  `rate` int(11) NOT NULL DEFAULT '0',
  `voicename` varchar(255) NOT NULL DEFAULT 'fr-FR-DeniseNeural',
  `neural` varchar(255) NOT NULL DEFAULT 'true',
  `gender` varchar(255) NOT NULL DEFAULT 'femalle',
  PRIMARY KEY (`ai`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `ai` double NOT NULL AUTO_INCREMENT,
  `id` varchar(65) NOT NULL,
  `guildid` varchar(65) NOT NULL,
  `message` int(11) NOT NULL DEFAULT '0',
  `message_delete` int(11) NOT NULL DEFAULT '0',
  `message_update` int(11) NOT NULL DEFAULT '0',
  `link` int(11) NOT NULL DEFAULT '0',
  `discord_link` int(11) NOT NULL DEFAULT '0',
  `image_link` int(11) NOT NULL DEFAULT '0',
  `video_link` int(11) NOT NULL DEFAULT '0',
  `audio_link` int(11) NOT NULL DEFAULT '0',
  `file` int(11) NOT NULL DEFAULT '0',
  `image_file` int(11) NOT NULL DEFAULT '0',
  `audio_file` int(11) NOT NULL DEFAULT '0',
  `video_file` int(11) NOT NULL DEFAULT '0',
  `invite_create` int(11) NOT NULL DEFAULT '0',
  `invite_used` int(11) NOT NULL DEFAULT '0',
  `invite_join` int(11) NOT NULL DEFAULT '0',
  `invite_leave` int(11) NOT NULL DEFAULT '0',
  `emote` int(11) NOT NULL DEFAULT '0',
  `custom_emote` int(11) NOT NULL DEFAULT '0',
  `reaction_add` int(11) NOT NULL DEFAULT '0',
  `reaction_remove` int(11) NOT NULL DEFAULT '0',
  `timestamp` date NOT NULL,
  PRIMARY KEY (`ai`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- 2021-08-26 12:57:35
