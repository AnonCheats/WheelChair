// ==UserScript==
// @name         ✔️ Krunker.io WheelChair [AnonCheat]
// @namespace    https://github.com/AnonCheat
// @version      1.8.5
// @description  WheelChair
// @author       AnonCheat
// @match        *://krunker.io/*
// @run-at       document-start
// @require      https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js
// @require      https://krunkr.com/assets/js/canvas.gui.js?ver=0.7
// @grant        none
// ==/UserScript==
WebFont.load({
   google: {
      families: ['Roboto']
   }
});
(function () {
   const options = {
      aimbot: true,
      silentAim: false,
      boxEsp: true,
      boxColor: "rgba(0,0,0,1)",
      weaponEsp: true,
      healthEsp: true,
      nameEsp: true,
      chams: true,
      autoReload: true,
      autoJump: true,
      orgNameTags: false,
      aimThroughWalls: false,
      chamsColorStr: "rgba(255,255,255,1)",
      chamsRed: 255,
      chamsBlue: 0,
      chamsGreen: 0,
   };
   window.options = options;
   const styles = {
      fontFamily: "Roboto",
      itemHeight: 28,
      setup: {
         background: "#0B132B",
         color: "#4c698d",
         fontSize: "16px",
         header: {
            color: "#839cbc",
            fontSize: "20px",
            borderBottom: "#3A506B",
            paddingBottom: 20
         },
         steps: {
            background: "white",
            selected: "#5BC0BE",
         }
      },
      profiles: {
         background: "#090F22",
         borderBottom: "#4c698d"
      },
      folder: {
         header: {
            color: "#4c698d",
            fontSize: "15.4px",
            background: "#0B132B"
         }
      },
      item: {
         color: "#839cbc",
         fontSize: "13.2px",
         background: "#1C2541"
      },
      button: {
         background: "#1C2541",
         lineTop: "#5BC0BE",
         color: "#4c698d",
         hovered: "#5BC0BE",
         hoveredColor: "#242f53"
      },
      checkbox: {
         background: "#242f53",
         checkedBg: "#5BC0BE",
         hovered: "rgba(91,192,190,0.3)",
         width: 18,
         height: 18
      },
      input: {
         background: "#242f53",
         color: "#4c698d",
         cursor: "#839cbc",
         width: 120,
         height: 22
      },
      select: {
         background: "#242f53",
         color: "#4c698d",
         hovered: "#3A506B",
         width: 80,
         height: 20,
      },
      option: {
         background: "#242f53",
         color: "#4c698d",
         hovered: "#3A506B",
         hoveredColor: "white",
         outline: "#0B132B"
      },
      slider: {
         background: "#242f53",
         color: "#5BC0BE",
         slider: "#5BC0BE",
         hovered: "#3A506B",
         width: 89,
         height: 20,
         leftPadding: 100,
         input: {
            width: 43,
         }
      }
   }


   const replace = String.prototype.replace;
   var hideHook = function (fn, oFn) {
      fn.toString = oFn.toString.bind(oFn);
   }
   const menu = new MyGUI(false, 0, 0, 250, 250, styles, "wheelchair", 1)
   menu.remember(window.options)
   window.menu = menu;
   const poweredWheelAimbot = menu.addFolder("Aimbot", true)
   const poweredWheelVisuals = menu.addFolder("Visuals", true)
   poweredWheelAimbot.add("Aimbot", window.options, "aimbot", "Check")
   poweredWheelAimbot.add("Silent Aim", window.options, "silentAim", "Check")
   poweredWheelAimbot.add("Auto Reload", window.options, "autoReload", "Check")
   poweredWheelAimbot.add("Aim Through Walls", window.options, "aimThroughWalls", "Check")
   poweredWheelVisuals.add("Game Esp", window.options, "orgNameTags", "Check")
      .onChange((val) => {
         if (val) {
            window.options.nameEsp = false;
            window.options.boxEsp = false;
            window.options.weaponEsp = false;
            window.options.healthEsp = false;
         }
      })
   poweredWheelVisuals.add("Name Esp", window.options, "nameEsp", "Check")
      .onChange((val) => {
         if (val && window.options.orgNameTags) window.options.orgNameTags = !window.options.orgNameTags
      })
   poweredWheelVisuals.add("Box Esp", window.options, "boxEsp", "Check")
      .onChange((val) => {
         if (val && window.options.orgNameTags) window.options.orgNameTags = !window.options.orgNameTags
      })
   poweredWheelVisuals.add("Weapon Esp", window.options, "weaponEsp", "Check")
      .onChange((val) => {
         if (val && window.options.orgNameTags) window.options.orgNameTags = !window.options.orgNameTags
      })
   poweredWheelVisuals.add("Health Esp", window.options, "healthEsp", "Check")
      .onChange((val) => {
         if (val && window.options.orgNameTags) window.options.orgNameTags = !window.options.orgNameTags
      })
   poweredWheelVisuals.add("Chams", window.options, "chams", "Check")
   poweredWheelVisuals.add("Box Color", window.options, "boxColor", "Color")

   poweredWheelVisuals.add("Chams Color", window.options, "chamsColorStr", "Color")
      .onChange((val) => {
         const {
            1: r,
            2: g,
            3: b
         } = val.match(/rgba\((\d+),(\d+),(\d+),\d+\)/)
         window.options.chamsRed = (r - 0) / (255 - 0)
         window.options.chamsGreen = (g - 0) / (255 - 0)
         window.options.chamsBlue = (b - 0) / (255 - 0)
      })

   window.hrtCheat = function (me, inputs, world, consts, math) {
      var controls = world.controls;
      const SHOOT = 5,
         SCOPE = 6,
         xDr = 3,
         yDr = 2,
         JUMP = 7,
         CROUCH = 8;
      var isEnemy = function (player) {
         return !me.team || player.team != me.team
      };
      var canHit = function (player) {
         return null == (window.options.aimThroughWalls ? world.canHit(me, player.x3, player.y3 - player.crouchVal * consts.crouchDst, player.z3) : world.canSee(me, player.x3, player.y3 - player.crouchVal * consts.crouchDst, player.z3))
      };
      var normaliseYaw = function (yaw) {
         return (yaw % Math.PI2 + Math.PI2) % Math.PI2;
      };
      var dAngleTo = function (x, y, z) {
         var ty = normaliseYaw(math.getDir(controls.object.position.z, controls.object.position.x, z, x));
         var tx = math.getXDire(controls.object.position.x, controls.object.position.y, controls.object.position.z, x, y, z);
         var oy = normaliseYaw(controls.object.rotation.y);
         var ox = controls.pchObjc.rotation.x;
         var dYaw = Math.min(Math.abs(ty - oy), Math.abs(ty - oy - Math.PI2), Math.abs(ty - oy + Math.PI2));
         var dPitch = tx - ox;
         return Math.hypot(dYaw, dPitch);
      };
      var calcAngleTo = function (player) {
         return dAngleTo(e.x3, e.y3 + consts.playerHeight - (consts.headScale + consts.hitBoxPad) / 2 - e.crouchVal * consts.crouchDst, e.z3);
      };
      var calcDistanceTo = function (player) {
         return math.getD3D(player.x3, player.y3, player.z3, me.x, me.y, me.z)
      };
      var isCloseEnough = function (player) {
         var distance = calcDistanceTo(player);
         return me.weapon.range >= distance && ("Shotgun" != me.weapon.name || distance < 70) && ("Akimbo Uzi" != me.weapon.name || distance < 100);
      };
      var haveAmmo = function () {
         return me.ammos[me.weaponIndex];
      };
      // runs once
      if (!window.init) {
         window.init = true
         window.drawVisuals = function (c, scalingFactor, perspective) {
            if (!window.ctx) {
               window.ctx = c.getContext("2d")
            }
            c = window.ctx;
            var scaledWidth = c.canvas.width / scalingFactor;
            var scaledHeight = c.canvas.height / scalingFactor;
            var worldPosition = perspective.camera.getWorldPosition();
            for (var i = 0; i < world.players.list.length; i++) {
               var player = world.players.list[i];
               var e = players[i];
               if (e.isYou || !e.active || !e.objInstances || !isEnemy(e)) {
                  continue;
               }
               // find min x, max x, min y, max y
               var xmin = Infinity;
               var xmax = -Infinity;
               var ymin = Infinity;
               var ymax = -Infinity;
               var br = false;
               for (var j = -1; !br && j < 2; j += 2) {
                  for (var k = -1; !br && k < 2; k += 2) {
                     for (var l = 0; !br && l < 2; l++) {
                        var position = e.objInstances.position.clone();
                        position.x += j * consts.playerScale;
                        position.z += k * consts.playerScale;
                        position.y += l * (consts.playerHeight - e.crouchVal * consts.crouchDst);
                        if (!perspective.frustum.containsPoint(position)) {
                           br = true;
                           break;
                        }
                        position.project(perspective.camera);
                        xmin = Math.min(xmin, position.x);
                        xmax = Math.max(xmax, position.x);
                        ymin = Math.min(ymin, position.y);
                        ymax = Math.max(ymax, position.y);
                     }
                  }
               }

               if (br) {
                  continue;
               }

               xmin = (xmin + 1) / 2;
               ymin = (ymin + 1) / 2;
               xmax = (xmax + 1) / 2;
               ymax = (ymax + 1) / 2;


               c.save();
               c.scale(scalingFactor, scalingFactor)


               var distanceScale = Math.max(.3, 1 - math.getD3D(worldPosition.x, worldPosition.y, worldPosition.z, e.x, e.y, e.z) / 600);
               c.scale(distanceScale, distanceScale);
               var xScale = scaledWidth / distanceScale;
               var yScale = scaledHeight / distanceScale;
               ymin = yScale * (1 - ymin);
               ymax = yScale * (1 - ymax);
               xmin = xScale * xmin;
               xmax = xScale * xmax;
               if (window.options.boxEsp) {
                  c.lineWidth = 5;
                  c.strokeStyle = window.options.boxColor;
                  c.beginPath();
                  c.moveTo(xmin, ymin);
                  c.lineTo(xmin, ymax);
                  c.lineTo(xmax, ymax);
                  c.lineTo(xmax, ymin);
                  c.lineTo(xmin, ymin);
                  c.stroke();
               }
               // health bar
               if (window.options.healthEsp) {
                  c.fillStyle = "rgba(255,50,50,1)";
                  var barMaxHeight = ymax - ymin;
                  c.fillRect(xmin - 7, ymin, -10, barMaxHeight);
                  c.fillStyle = "#00FFFF";
                  c.fillRect(xmin - 7, ymin, -10, barMaxHeight * (e.health / e.maxHealth));
               }
               // info
               var x = xmax + 7;
               var y = ymax;
               c.fillStyle = "white";
               c.strokeStyle = 'black';
               c.lineWidth = 1;
               if (window.options.nameEsp) {
                  c.font = "60px Roboto";
                  c.fillText(e.name, x, y);
                  c.strokeText(e.name, x, y);
               }
               c.font = "30px Sans-serif";
               if (window.options.weaponEsp) {
                  y += 35;
                  c.fillText(e.weapon.name, x, y);
                  c.strokeText(e.weapon.name, x, y);
               }
               if (window.options.healthEsp) {
                  y += 35;
                  c.fillText(e.health + ' HP', x, y);
                  c.strokeText(e.health + ' HP', x, y);
               }
               c.restore();

               // skelly chams
               var material = e.legMeshes[0].material;
               if (window.options.chams) {
                  material.alphaTest = 1;
                  material.depthTest = false;
                  material.fog = false;
                  material.emissive.r = window.options.chamsRed
                  material.emissive.g = window.options.chamsGreen
                  material.emissive.b = window.options.chamsBlue
                  material.wireframe = true;
               } else if (!window.options.chams) {
                  material.alphaTest = 0;
                  material.depthTest = true;
                  material.fog = true;
                  material.emissive.r = 0;
                  material.emissive.g = 0;
                  material.emissive.b = 0;
                  material.wireframe = false;
               }
            }
         }
      }

      // auto reload
      if (window.options.autoReload) controls.keys[controls.reloadKey] = !haveAmmo();
      // auto jump
      if (window.options.autoJump) inputs[JUMP] = (controls.keys[controls.jumpKey] && !me.didJump) * 1;
      // target selector - based on closest to aim
      var closest = null,
         closestAngle = Infinity;
      var players = world.players.list;


      if (!window.options.aimbot) return;
      for (var i = 0; me.active && i < players.length; i++) {
         var e = players[i];
         if (e.isYou || !e.active || !e.objInstances || !isEnemy(e)) {
            continue;
         }

         // experimental prediction
         var scale = Math.min(1.6, e.dt / (consts.serverSendRate * consts.interpolation));
         // this check is so that we don't shoot people that just respawn
         if (math.getD3D(e.x2, e.y2, e.z2, e.x, e.y, e.z) < 100) {
            e.x3 = e.x + (e.x2 - e.x) * scale;
            e.y3 = e.y + (e.y2 - e.y) * scale;
            e.z3 = e.z + (e.z2 - e.z) * scale;
         } else {
            e.x3 = e.x;
            e.y3 = e.y;
            e.z3 = e.z;
         }

         if (!isCloseEnough(e) || !canHit(e)) {
            continue;
         }

         var angle = calcAngleTo(e);
         if (angle < closestAngle) {
            closestAngle = angle;
            closest = e;
         }
      }

      // aimbot
      var ty = controls.object.rotation.y,
         tx = controls.pchObjc.rotation.x;
      if (closest) {
         var target = closest;
         var y = target.y3 + consts.playerHeight - (consts.headScale /* + consts.hitBoxPad*/ ) / 2 - target.crouchVal * consts.crouchDst;
         if (me.weapon.nAuto && me.didShoot) {
            inputs[SHOOT] = 0;
         } else if (!me.aimVal) { // me.recoilAnimY < 0.1 - if you want to shoot more slower and perhaps more accurately
            // inputs[CROUCH] = 1; // auto crouch
            inputs[SHOOT] = 1;
            inputs[SCOPE] = 1;
         } else {
            // inputs[CROUCH] = 1; // auto crouch
            inputs[SCOPE] = 1;
         }

         ty = math.getDir(controls.object.position.z, controls.object.position.x, target.z3, target.x3);
         tx = math.getXDire(controls.object.position.x, controls.object.position.y, controls.object.position.z, target.x3, y, target.z3);

         // perfect recoil control..?
         tx -= .3 * me.recoilAnimY;
      } else {
         inputs[SHOOT] = controls.mouseDownL;
         inputs[SCOPE] = controls.mouseDownR;
         // inputs[CROUCH] = controls.keys[controls.crouchKey] * 1; // auto crouch
      }

      // silent aim
      const newY = (ty % Math.PI2).round(3);
      const newX = (tx % Math.PI2).round(3);
      inputs[xDr] = newX;
      inputs[yDr] = newY;
      if (!window.options.silentAim) {
         controls.object.rotation.y = newY
         controls.pchObjc.rotation.x = newX
      }

   }
   const handler = {
      construct(target, args) {
         if (args.length == 2 && args[1].includes('Seen')) {
            var script = args[1];

            var version = script.match(/\w+\['exports'\]=(0[xX][0-9a-fA-F]+);/)[1];
            if (version !== "0x8d71") {
               document.write('Version missmatch, wait for hrt');
               document.write('Version missmatch ( ' + version + ')');
               window.location.href = atob('aHR0cHM6Ly9naXRodWIuY29tL2hydC93aGVlbGNoYWly');
            }

            var hook = /(\w+)\['tmpInputs'\]\['push'\]\((\w+)\),/;
            var tokens = script.match(hook);
            var inputs = tokens[2];
            var world = script.match(/(\w+)\['players'\]\['updateMesh'\]/)[1];
            var consts = script.match(/(\w+)\['thirdPX'\],/)[1];
            var me = script.match(/\((\w+)\|\|window\['spectating'\]\)/)[1];
            var math = script.match(/\['xDr'\]\+(\w+)\['getDir'\]/)[1];

            var ttapParams = [me, inputs, world, consts, math];

            script = replace.call(script, hook, tokens[0] + '(' + hrtCheat.toString() + ')(' + ttapParams + '),');

            //Remove clear rect inside overlay render.
            script = replace.call(script, /,\w+\['clearRect'\]\(0x0,0x0,\w+,\w+\)/, "");

            // remove renders
            script = replace.call(script, /'none'==menuHolder\['style'\]\['display'\]&&'none'==endUI\['style'\]\['display'\]\)/g, '!window.options.boxEsp && !window.options.weaponEsp && !window.options.healthEsp && !window.options.healthEsp)');

            //Hook overlay render and force menu to clear frame
            script = replace.call(script, /(\w+)\[\'render\'\]\((\w+),\w+,(\w+),\w+,\w+\),/, (a, b, c, d) => `window.menu.draw(${b}.canvas,true),(window.drawVisuals && window.drawVisuals(${b}.canvas,${c},${d})),${a} `);

            // all weapons trails on
            script = replace.call(script, /\w+\['weapon'\]&&\w+\['weapon'\]\['trail'\]/g, "true")

            // color blind mode
            script = replace.call(script, /#9eeb56/g, '#00FFFF');

            // no zoom
            script = replace.call(script, /,'zoom':.+?(?=,)/g, ",'zoom':1");

            var canSee = script.match(/this\['canSee'\]\=function.+?(?=return null;})/)[0] + "return null;}";
            var canHit = replace.call(canSee, /canSee/g, "canHit");
            canHit = replace.call(canHit, /\|\|0x0;/, "||0x0;var pcount=0;");
            var player = canHit.match(/function\(([a-zA-Z0-9]*),/)[1];
            var object = canHit.match(/([a-zA-Z0-9]*)\=this\['map'\]\['manager'\]\['objects'/)[1];
            var statement = canHit.match(/\['transparent'\]\){(.+?(?=}))/)[1];
            var ret = statement.match(/return [a-zA-Z0-9]*/)[0];
            statement = replace.call(statement, ret, "{pcount+=1; if(pcount>1&&" + player + ".weapon.pierce>0.8){" + ret + "}}");
            var search = canHit.match(/return [a-zA-Z0-9]*;\}/)[0];
            canHit = replace.call(canHit, search, search + 'else if(' + object + '.active&&' + object + '.penetrable){' + statement + '}')
            search = canHit.match(/\![a-zA-Z0-9]*\['transparent'\]/)[0];
            // todo: onhit logic doesn't make sense
            canHit = replace.call(canHit, search, "(!" + object + ".penetrable||!" + player + ".weapon.pierce)");
            script = replace.call(script, ",this['canSee']", "," + canHit + ",this['canSee']");

            args[1] = script;
         }
         return new target(...args);
      }
   };

   var original_Function = Function;
   Function = new Proxy(Function, handler);
   hideHook(Function, original_Function);
})()

 // Credit to: https://github.com/hrt
