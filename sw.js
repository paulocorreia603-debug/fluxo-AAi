self.addEventListener("install",function(e){self.skipWaiting()});
self.addEventListener("activate",function(e){e.waitUntil(self.clients.claim())});
var T={ok:["💰 Venda aprovada!","🔥 Caiu venda!","🎉 Cliente pagou!","🚀 Mais uma venda!","🤑 Dinheiro a entrar!","✅ Pagamento confirmado!"],pend:["⏳ Venda pendente","🧾 Nova referência gerada","🕐 Alguém quer comprar","📌 Pagamento por confirmar"]};
function pick(a){return a[Math.floor(Math.random()*a.length)]}
self.addEventListener("push",function(e){e.waitUntil((async function(){
 var est="",v=null,pr="";
 try{var c=await caches.open("fluxo"),r=await c.match("k"),k=r?await r.text():"";
  if(k){var j=await(await fetch("https://nqtfgtvonqkdxxapidfg.supabase.co/functions/v1/push?acao=ultima",{headers:{"x-k":k}})).json();est=j.estado||"";v=j.valor;pr=j.produto||""}}catch(x){}
 var pend=/pending/i.test(est),val=v?Number(v).toLocaleString("pt-PT")+" Kz":"";
 await self.registration.showNotification(pick(pend?T.pend:T.ok),{body:val?val+(pr?" · "+pr:""):"Abre o Fluxo AI para ver.",icon:"icon.png",badge:"icon.png"})})())});
self.addEventListener("notificationclick",function(e){e.notification.close();e.waitUntil(self.clients.matchAll({type:"window"}).then(function(l){return l.length?l[0].focus():self.clients.openWindow("./")}))});
