-- Adminer 4.8.1 MySQL 5.5.68-MariaDB dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

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



-- 2021-08-26 12:57:35
