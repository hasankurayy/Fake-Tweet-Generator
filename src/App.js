import { useState, createRef, useEffect } from "react";
import { LikeIcon, ReplyIcon, RetweetIcon, ShareIcon, VerifiedIcon } from "./icons";
import { useScreenshot } from 'use-react-screenshot'

const tweetFormat = tweet => {
    tweet = tweet.replace(/@([\w]+)/, "<span>@$1</span>")
    tweet = tweet.replace(/#([\wişçğüı]+)/, "<span>#$1</span>")
    return tweet
}



function App() {

    const [name, setName] = useState()
    const [username, setUsername] = useState()
    const [isVerified, setIsVerified] = useState("false")
    const [tweet, setTweet] = useState()
    const [avatar, setAvatar] = useState()
    const [retweets, setRetweets] = useState(0)
    const [quoteTweets, setQuoteTweets] = useState(0)
    const [likes, setLikes] = useState(0)

    // screenshot indirmek için
    const [image, takeScreenshot] = useScreenshot()
    const tweetRef = createRef(null)
    const downloadRef = createRef()
    const getImage = () => takeScreenshot(tweetRef.current)

    useEffect(() => {
        if (image) {
            downloadRef.current.click()  // ref'i downloadRef olan elemana git ve tıkla.
        }
    }, [image])

    // dosyadan avatar için resim seçme
    const avatarHandle = (e) => {
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.addEventListener("load", function () {
            setAvatar(this.result)
        })
        reader.readAsDataURL(file)
    }

    const handleChange = (e) => {
        console.log(typeof (isVerified))
        setIsVerified(e.target._valueTracker.getValue())
    }

    return (
        <>
            <div className="tweet-settings">
                <div className="header-row-1">
                    <div className="logo-mine">
                        <a href="#">HKRY</a>
                    </div>
                    <h3>Tweet Ayarları</h3>
                </div>
                <ul>
                    <li>
                        <label>Ad Soyad</label>
                        <input onChange={e => setName(e.target.value)} type="text" />
                    </li>
                    <li>
                        <label>Kullanıcı Adı</label>
                        <input onChange={e => setUsername(e.target.value)} type="text" />
                    </li>
                    <li>
                        <label>Doğrulanmış</label>
                        <input
                            style={{ width: "15px", marginLeft: "5px", borderBottom: "1px solid #2f3336", marginBottom: "20px" }}
                            onChange={handleChange}
                            type="checkbox" />
                        <hr />
                    </li>
                    <li>
                        <label>Tweet</label>
                        <textarea onChange={e => setTweet(e.target.value)} cols="10" rows="10"></textarea>
                    </li>
                    <li>
                        <label>Profil Resmi</label>
                        <input onChange={avatarHandle} type="file" />
                    </li>
                    <li>
                        <label>Retweet</label>
                        <input onChange={e => setRetweets(e.target.value)} type="number" />
                    </li>
                    <li>
                        <label>Alıntı Tweetler</label>
                        <input onChange={e => setQuoteTweets(e.target.value)} type="number" />
                    </li>
                    <li>
                        <label>Beğeni</label>
                        <input onChange={e => setLikes(e.target.value)} type="number" />
                    </li>

                    <button onClick={getImage}>Oluştur</button>
                    <div className="download-url">
                        {image && (
                            <a href={image} download="tweet.png" ref={downloadRef} >
                                Tweeti İndir
                            </a>
                        )}
                    </div>
                </ul>
            </div>

            <div className="tweet-container">
                <div className="tweet" ref={tweetRef}>

                    <div className="tweet-author">
                        <img src={avatar || "https://bczl.meb.k12.tr/meb_iys_dosyalar/34/06/969693/resimler/2021_04/02102222_2118fbf0-51e6-477f-b6f7-175761b15217.jpg"} alt="" />
                        <div>
                            <div className="name">
                                {name || "Ad-Soyad"}
                                {isVerified === "true" && <VerifiedIcon />}
                            </div>
                            <div className="username">@{username || "kullaniciadi"}</div>
                        </div>
                    </div>

                    <div className="tweet-content">
                        <p dangerouslySetInnerHTML={{ __html: tweet ? tweetFormat(tweet) : "Bu alana örnek tweet gelecek." }}>
                            {/* tweetFormat içindeki span etiketlerini algılaması için yapılmıştır. */}
                        </p>
                    </div>

                    <div className="tweet-stats">
                        <span><b>{retweets}</b> Retweet</span>
                        <span><b>{quoteTweets}</b> Alıntı Tweetler</span>
                        <span><b>{likes}</b> Beğeni</span>
                    </div>

                    <div className="tweet-actions">
                        <span><ReplyIcon /></span>
                        <span><RetweetIcon /></span>
                        <span><LikeIcon /></span>
                        <span><ShareIcon /></span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
