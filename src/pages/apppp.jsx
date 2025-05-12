'use client';

import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls, Sphere, Html } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';

function Sun() {
  const sunTexture = useLoader(THREE.TextureLoader, '/textures/2k_sun.jpg');
  return (
    <Sphere position={[0, 0, 0]} args={[1.8, 64, 64]} castShadow receiveShadow>
      <meshStandardMaterial map={sunTexture} emissive="orange" emissiveIntensity={2} />
      <Html center position={[0, 2.2, 0]}>
        <div style={{ color: 'rgb(0,0,0)', fontSize: '14px' }}>الشمس</div>
      </Html>
    </Sphere>
  );
}

function EarthSystem({ paused }) {
  const earthRef = useRef();
  const moonRef = useRef();
  const earthTexture = useLoader(THREE.TextureLoader, '/textures/earthmap1k.jpg');
  const moonTexture = useLoader(THREE.TextureLoader, '/textures/2k_moon.jpg');

  const pausedAtRef = useRef(null); // Time when paused
  const totalPausedDurationRef = useRef(0); // Total paused duration

  useFrame(({ clock }) => {
    if (paused) {
      if (pausedAtRef.current === null) {
        pausedAtRef.current = clock.getElapsedTime(); // Save the time when paused
      }
      return;
    }

    if (pausedAtRef.current !== null) {
      // Calculate total paused duration when resuming
      totalPausedDurationRef.current += clock.getElapsedTime() - pausedAtRef.current;
      pausedAtRef.current = null; // Reset pausedAt
    }

    const elapsedTime = clock.getElapsedTime() - totalPausedDurationRef.current;

    const earthOrbitRadius = 5;
    const moonOrbitRadius = 1.2;

    // Earth around Sun
    const earthX = Math.sin(elapsedTime * 0.3) * earthOrbitRadius;
    const earthZ = Math.cos(elapsedTime * 0.3) * earthOrbitRadius;
    earthRef.current.position.set(earthX, 0, earthZ);

    // Moon around Earth
    const moonX = earthX + Math.sin(elapsedTime) * moonOrbitRadius;
    const moonZ = earthZ + Math.cos(elapsedTime) * moonOrbitRadius;
    moonRef.current.position.set(moonX, 0, moonZ);
  });

  return (
    <>
      {/* Earth */}
      <group ref={earthRef}>
        <Sphere args={[0.6, 64, 64]} castShadow receiveShadow>
          <meshStandardMaterial map={earthTexture} />
          <Html center position={[0, 1, 0]}>
            <div style={{ color: 'white', fontSize: '12px' }}>الأرض</div>
          </Html>
        </Sphere>
      </group>

      {/* Moon */}
      <group ref={moonRef}>
        <Sphere args={[0.2, 32, 32]} castShadow receiveShadow>
          <meshStandardMaterial map={moonTexture} />
          <Html center position={[0, 0.5, 0]}>
            <div style={{ color: 'white', fontSize: '10px' }}>القمر</div>
          </Html>
        </Sphere>
      </group>
    </>
  );
}

export default function Home() {
  const [paused, setPaused] = useState(false);

  return (
    <div style={{ width: '100vw', height: '100vh', background: 'black', display: 'flex', flexDirection: 'row' }}>
      <a
        onClick={() => {
          window.location.href = "/kousouf__5ousouf";
        }}
        style={{
          position: 'absolute',
          top: "4vh",
          right: "60vh",
          padding: '10px 20px',
          background: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: 'bold',
        }}
      >
        Watch a Demo
      </a>
      <Canvas shadows camera={{ position: [0, 10, 15], fov: 50 }}>
        <ambientLight intensity={0.2} />
        <directionalLight
          position={[5, 10, 5]}
          intensity={2}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <OrbitControls />
        <Sun />
        <EarthSystem paused={paused} />
      </Canvas>

      <button
        onClick={() => setPaused(!paused)}
        style={{
          position: 'absolute',
          top: 20,
          left: 20,
          padding: '10px 20px',
          background: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: 'bold',
        }}
      >
        {paused ? 'Resume ☀️🌍' : 'Pause ⏸️'}
      </button>

      <div style={{ overflowY: 'auto', padding: '20px', color: 'white', background: '#111', width: '70vw', height: '95vh',margin:0 }}>
        <h2>ماذا تعني كلمة "الكسوف" و"الخسوف" لغويًا؟</h2>
        <p>
          في اللغة العربية، "الكسوف" يُطلق عادةً على الشمس ويعني احتجاب نورها أو ضعفه، بينما "الخسوف" يُطلق على القمر ويعني ذهاب ضوئه. يعني حتى الكلمة نفسها فيها معنى اختفاء النور، لكن تختلف حسب مين اللي بيختفي: الشمس أو القمر.
        </p>

        <h2>أنواع الكسوف والخسوف</h2>
        <ul>
          <li><strong>كسوف كلي:</strong> يحدث عندما يغطي القمر قرص الشمس بالكامل، وتصبح السماء مظلمة تمامًا في وضح النهار في المنطقة المحددة.</li>
          <li><strong>كسوف جزئي:</strong> لما القمر يغطي جزء من الشمس فقط.</li>
          <li><strong>كسوف حلقي:</strong> يصير لما القمر يكون بعيد شوي عن الأرض وما يقدر يغطي الشمس كليًا، فتبقى حلقة مضيئة حوالين القمر.</li>
          <li><strong>خسوف كلي:</strong> الأرض تحجب ضوء الشمس عن القمر بالكامل، فيتحوّل لونه للأحمر الغامق بسبب انعكاس الضوء من الغلاف الجوي – واللي نسميه "قمر الدم".</li>
          <li><strong>خسوف جزئي:</strong> جزء فقط من القمر يدخل ظل الأرض، فيظهر القمر كأنه مأكول جزئيًا.</li>
          <li><strong>خسوف شبه ظل:</strong> يصير لما القمر يمر في منطقة شبه ظل الأرض، ويكون تغيّر الضوء خفيف جدًا وصعب ملاحظته.</li>
        </ul>

        <h2>هل للكسوف والخسوف  تأثير على الطاقة والمزاج؟ 🌚🌞</h2>
        <p>
          بعض الناس (خاصة في علم الطاقة والفلك الغربي) يقولوا إن الكسوف والخسوف يؤثروا على الحالة النفسية والطاقة الكونية. يعتبروا الخسوف وقت للتأمل ومراجعة النفس، والكسوف وقت لبداية جديدة أو قطع علاقات سامة. لكن هذا مجرد اعتقادات روحية، وماهوش مثبت علميًا.
        </p>

        <h2>معلومات عن الكسوف والخسوف:</h2>
        <ul>
          <li>الكسوف الكامل نادر جداً في نفس المكان، ممكن ما يتكررش إلا بعد 375 سنة!</li>
          <li>الخسوف يُمكن رؤيته من نصف الكرة الأرضية اللي يكون فيه الليل.</li>
          <li>في سنة 1919، استُخدم الكسوف لاختبار نظرية أينشتاين للنسبية العامة!</li>
          <li>في بعض الثقافات القديمة، كانوا يعتقدوا إن الخسوف والكسوف علامة على غضب الآلهة.</li>
        </ul>

        <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>الفرق بين الكسوف والخسوف</h1>
        <p>
          الفرق بين الكسوف والخسوف، يُمكن تعريف الخسوف على أنّه ظاهرة فلكيّة تحدث عندما يُصبح القمر في ظلّ الأرض، أي يحدث خسوف القمر عندما تكون الأرض بين القمر والشمس، بينما يُمكن تعريف كسوف الشمس على أنّه ظاهرة فلكيّة تحدث عندما يسقط ظلّ القمر على الأرض، أي يحدث كسوف الشمس عندما يكون القمر بين الأرض والشمس.
        </p>
        <ul>
          <li>كسوف الشمس ظاهرة كونية تحدث عندما يكون كل من الشمس والقمر والأرض على استقامة واحدة، بينما خسوف القمر يحدث بسبب وقوع الأرض بين الشمس والقمر.</li>
          <li>كسوف الشمس يحدث بين مرتين أو ثلاثة في السنة الواحدة، وخسوف القمر ثلاث مرات في السنة كحد أعلى.</li>
          <li>كسوف الشمس ظاهرة قد تستمر لعدة دقائق، بينما خسوف القمر لعدة ساعات.</li>
          <li>كسوف الشمس ظاهرة خطر للعين، وتتطلب حمايتها، ولكن خسوف القمر ظاهرة آمنة للعين، ولا تتطلب حمايتها.</li>
          <li>لا يمكن أن يحدث خسوفا للقمر إلا إذا كان القمر بدرًا في منتصف الشهر العربي، بينما الكسوف لا يمكن أن يحدث إلا إذا كان القمر محاقًا في أول الشهر العربي.</li>
          <li>في الكسوف الذي يحجب أشعة الشمس عن الأرض، هو القمر بسبب وقوعه بين الشمس والأرض، بينما في الخسوف الذي يحجب قرص الشمس عن القمر هو الأرض لوقوعها بين الشمس والقمر.</li>
          <li>كسوف الشمس دائماً تحدث في النهار، أما خسوف القمر يحدث ليلاً عندما تغيب الشمس.</li>
          <li>كسوف الشمس أكثر ندرة، فيتم مشاهدته في مناطق محددة، أما خسوف القمر فيتم مشاهدته من مناطق كثيرة يكون القمر فيها أعلى من الأفق.</li>
        </ul>

        <h2>أضرار خسوف القمر</h2>
        <p>
          أثبتت الدراسات العلمية عدم وجود أي تأثير سلبي على عينيّ الإنسان حين ينظر للقمر وقت الخسوف، أما التأثير السلبي يحدث وقت الكسوف عند النظر لقرص الشمس، واستمر العلماء في البحث كثيراً خلال فترة خسوف القمر، لمعرفة تأثيره على حياة الإنسان، فقاموا بإجراء تجارب على أشخاص متطوعين، وبعد انتهاء الأبحاث اكتشفوا عدة تأثيرات قالوا إنها في الغالب قد تحدث بسبب الخسوف، وقال البعض الآخر إنها مجرد توقعات.
        </p>

        <h2>أضرار كسوف الشمس</h2>
        <p>
          أجمع العلماء على أنَ النظر إلى قرص الشمس أثناء عملية الكسوف يُسبب الضرر، لأن الشمس ترسل أشعة فوق بنفسجية ضارة وأشعة تحت الحمراء غير المرئية، فتذهب مباشرة إلى العين ويمكن أن تدمر الشبكية، وبعد فترة يصاب الشخص بالعمى، لذلك يجب تفادي رؤية الكسوف بالعين المجردة، وارتداء نظارة خاصة للحدث.
        </p>

        <h2>أسباب خسوف القمر ومدته</h2>
        <ul>
          <li>يحدث عندما تقع الأرض في المنتصف بين القمر والشمس، فيقع ظل الأرض على القمر، فتحجب الضوء عن القمر فيحدث وقتها خسوف للقمر.</li>
          <li>إذا حجبت الأرض الضوء عن القمر بشكل كامل فيصبح خسوف كلياً، ويظهر لونه أحمر ويستمر 84 ثانية أو أكثر.</li>
          <li>إذا حجبت الأرض جزءاً من القمر فيصبح خسوف جزئياً، ولا يتعدى مدته 3 ساعات.</li>
        </ul>

        <h2>أسباب كسوف الشمس ومدته</h2>
        <ul>
          <li>عندما يقع القمر في المنتصف بين الشمس والأرض، فيمنع أشعة الشمس من السقوط على الأرض.</li>
          <li>وقوع الظليل وهو شبه ظل القمر، فيقع على منطقة معينة من الأرض، فتحجب أشعة الشمس عن تلك المنطقة فقط، وقد يستمر لمدة ساعتين.</li>
        </ul>

        <h2>الكسوف والخسوف في الإسلام</h2>
        <p>
          تُصلى صلاة الكسوف والخسوف في أي وقت يحصل فيه الخسوف سواء في الليل أو النهار، وهي من السنن المؤكدة وعدد ركعاتها ركعتان، وينادى الإمام للصلاة بقول: الصلاة جامعة، وعندما حدث كسوف للشمس في عهد سيدنا محمد -صلى الله عليه وسلم- فقام فزعاً وذهب للمسجد ليصلي، فعن عائشة -رضي الله عنها وأرضاها- قالت: إن الشمس خسفت على عهد رسول الله صلى الله عليه، وسلم “فبعث منادياً ينادي الصلاة جامعة فاجتمعوا وتقدم فكبر وصلى أربع ركعات في ركعتين وأربع سجدات” رواه مسلم.
        </p>
      </div>
    </div>
  );
}
