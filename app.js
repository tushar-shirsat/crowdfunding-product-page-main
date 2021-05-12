const FundController =(function(){
    const storage = {
        totalFund: 100000,
        collectedFund: 0,
        remainingFund: 100000,
        days: 56,
        agency:{
            BambooStand: 101,
            BlackEditionStand: 64,
            MahoganySpecialEdition: 0,
        }
    }
    return{
        fundStorage: function(){
            return storage;
        },
        calculateFund: function(amount,cardId){
            storage.collectedFund += amount;
            storage.remainingFund -= amount;
            if(cardId==="bamboo-stand-25"){
                storage.agency.BambooStand -= 1;
            }
            if(cardId==="black-edition-75"){
                storage.agency.BlackEditionStand -= 1;
            }
            if(cardId==="mahogany-200"){
                storage.agency.MahoganySpecialEdition -= 1;
            }
        }
    }
})();

const UIController =(function(){
    htmlClassName = {
        mainpledgebtn : '.pledge-card-btn',
        pledgeNoRewardId: "no-rewards",
        bamboostandId:  "bamboo-stand",     
        blackeEditionId: "black-edition",
        mahoganyId: 'mahogany',
        pledgeAgencyPaymentCard:".pledge-agency-payment-card",
        backgroundCard: ".pledge-agency-payment-bg",
        close: ".fa-times",
        agencyCard: ".paymet-card",
        norewardPledgId: "no-rewards",
        reward25Id:"bamboo-stand-25",
        reward75Id: "black-edition-75",
        reward200Id: "mahogany-200",
        activeAgency: ".active",
        paymentBtn: ".btn",
        pledgemessage: ".pledge-message",
        pledgeAmount: ".pledge-amount",
        success: ".pledg-payment-success",
        successPaymentBtn: ".payment-btn",
        totalCollectedFund:".totalfund-collected-fund",
        totalRemainingFund:".remaining-fund",
        pledgePayCount:".left-pay-count",
        countLeft: ".count-left",
        progressBar: ".pledge-agency-fund-progress-bar",
        hamburger: ".hamburger"
    }

    function activeadd(active,noactive1,noactive2,noactive3){
        active.style.border = "2px solid hsl(176, 50%, 47%)";
        active.firstElementChild.firstElementChild.firstElementChild.checked = true;
        active.querySelector(".bottom").classList.add("active");
        
        noactive1.style.border = '1px solid lightgray';
        noactive1.querySelector(".bottom").classList.remove("active");
        noactive2.style.border = '1px solid lightgray';
        noactive2.querySelector(".bottom").classList.remove("active");
        noactive3.style.border = '1px solid lightgray';
        noactive3.querySelector(".bottom").classList.remove("active");
    }

    const extractFund = (fund) =>{
        fund = fund.toString();
        if(fund.length>3){
            return `${fund.slice(0,-3)},${fund.slice(-3)}`
        }else{
            return fund;
        }
    }

    return{
        htmlClassesAndId: function(){
            return htmlClassName;
        },
        activePledgePaymentCard: function(targetId){
            let pledgeCard = document.querySelectorAll(htmlClassName.agencyCard).forEach((ele) =>{
                let targetIndex = ele.id.indexOf(targetId);
                if(targetIndex > 1){
                    let activeNode = document.getElementById(ele.id);
                    activeNode.style.border = "2px solid hsl(176, 50%, 47%)";
                    document.getElementById(`radio-${targetId}`).checked = true;
                    activeNode.querySelector(".bottom").classList.add("active");
                }else{
                    let deactiveNode = document.getElementById(ele.id);
                    deactiveNode.style.border = "2px solid lightgray";
                    deactiveNode.querySelector(".bottom").classList.remove("active");
                }
            });
        },
        addActiveClass: function(){
            let noreward = document.getElementById(htmlClassName.norewardPledgId);
            let reward25 = document.getElementById(htmlClassName.reward25Id);
            let reward75 = document.getElementById(htmlClassName.reward75Id);
            let reward200 = document.getElementById(htmlClassName.reward200Id);
            noreward.addEventListener("click",(e) =>{
                activeadd(noreward,reward25,reward75,reward200)
            })
            reward75.addEventListener("click",(e) =>{
                activeadd(reward75,noreward,reward25,reward200)
            } )
            reward25.addEventListener("click",(e) =>{
                activeadd(reward25,noreward,reward75,reward200)
            } )
            reward200.addEventListener("click",(e) =>{
                activeadd(reward200,noreward,reward75,reward200)
            } )
        },
        aapUiFundDetail: function(storage){
            document.querySelector(htmlClassName.totalCollectedFund).textContent = `${extractFund(storage.collectedFund)}`;
            document.querySelector(htmlClassName.totalRemainingFund).textContent = `${extractFund(storage.remainingFund)}`;
            let pledge25= document.getElementById("pledge-25");
            pledge25.querySelector(htmlClassName.pledgePayCount).innerHTML = `${storage.agency.BambooStand} <span>left</span>`;
            let pledge75= document.getElementById("pledge-75");
            pledge75.querySelector(htmlClassName.pledgePayCount).innerHTML = `${storage.agency.BlackEditionStand} <span>left</span>`;
            let pledge200= document.getElementById("pledge-200");
            pledge200.querySelector(htmlClassName.pledgePayCount).innerHTML = `${storage.agency.MahoganySpecialEdition} <span>left</span>`;
            let payPledge25 = document.getElementById("bamboo-stand-25");
            payPledge25.querySelector(htmlClassName.countLeft).innerHTML = `${storage.agency.BambooStand} <span>left</span>`;
            let payPledge75 = document.getElementById("black-edition-75");
            payPledge75.querySelector(htmlClassName.countLeft).innerHTML = `${storage.agency.BlackEditionStand} <span>left</span>`;
            let payPledge200 = document.getElementById("mahogany-200");
            payPledge200.querySelector(htmlClassName.countLeft).innerHTML = `${storage.agency.MahoganySpecialEdition} <span>left</span>`;

            document.querySelector(".pledge-agency-fund-progress-bar").style.setProperty('--progress-width', `${(storage.collectedFund/storage.totalFund)*100}%`);
        },
        disable: function(storage){
            if(storage.agency.MahoganySpecialEdition <= 0){
                document.getElementById('pledge-200').classList.add("null");
                document.getElementById('mahogany-200').classList.add("null");
            }
            else if(storage.agency.BambooStand <= 0){
                document.getElementById("pledge-25").classList.add("null");
                document.getElementById("bamboo-stand-25").classList.add("null");
            }
            else if(storage.agency.BlackEditionStand <= 0){
                document.getElementById("pledge-200").classList.add("null");
                document.getElementById("mahogany-200").classList.add("null");
            }else{
                document.getElementById('pledge-200').classList.remove("null");
                document.getElementById('mahogany-200').classList.remove("null");
                document.getElementById("pledge-25").classList.remove("null");
                document.getElementById("bamboo-stand-25").classList.remove("null");
                document.getElementById("pledge-200").classList.remove("null");
                document.getElementById("mahogany-200").classList.remove("null");
            }
        },
        showNav: function(){
            document.querySelector(htmlClassName.hamburger).addEventListener('click',() =>{
                document.querySelector(".fund-navbar-links-left").classList.toggle("show-nav")
            })
        }
    }
})();

const MainController =(function(Fundctrl, UIctrl){
    let htmlClassAndId = UIctrl.htmlClassesAndId();
    const StratScript = () =>{
        document.querySelectorAll(htmlClassAndId.mainpledgebtn).forEach((ele)=>{
            ele.addEventListener('click',(e) =>{
                const paymentPledgeCard = document.querySelector(htmlClassAndId.pledgeAgencyPaymentCard);
                paymentPledgeCard.classList.add("show");
                document.querySelector(htmlClassAndId.backgroundCard).classList.add("show");
                let targetId = e.target.id
                UIctrl.activePledgePaymentCard(targetId);
            })
        })
        document.querySelector(htmlClassAndId.close).addEventListener("click",() =>{
            document.querySelector(htmlClassAndId.pledgeAgencyPaymentCard).classList.remove("show");
            document.querySelector(htmlClassAndId.backgroundCard).classList.remove("show");
        })
        UIctrl.showNav();
    };
    const fundCalculation = (e) =>{
        let active = e.target.parentNode.parentNode.classList.value.includes('active');
        let mainCard = e.target.parentNode.parentNode.parentNode.id; 
        
        if(active){
            let mainParent = document.getElementById(mainCard);
            let amount = +mainParent.querySelector(htmlClassAndId.pledgeAmount).value;
            Fundctrl.calculateFund(amount,mainCard);
            let storage = Fundctrl.fundStorage();
            UIctrl.aapUiFundDetail(storage);
            document.querySelector(htmlClassAndId.success).classList.add("show");
            mainParent.querySelector(".bottom").classList.remove("active");
            document.querySelector(htmlClassAndId.pledgeAgencyPaymentCard).classList.remove("show");
        }
    }
    document.querySelectorAll(htmlClassAndId.paymentBtn).forEach(btn =>{
        btn.addEventListener('click',(e) =>{
            fundCalculation(e);
        })
    })
    document.querySelector(htmlClassAndId.successPaymentBtn).addEventListener("click",() =>{
        document.querySelector(htmlClassAndId.success).classList.remove("show");
        document.querySelector(htmlClassAndId.backgroundCard).classList.remove("show");
    })
    UIctrl.addActiveClass();
    UIctrl.disable(Fundctrl.fundStorage())
    return{
        InitialScript: function(){
            StratScript();
            UIctrl.aapUiFundDetail(Fundctrl.fundStorage());
        }
    }
})(FundController,UIController);

MainController.InitialScript();