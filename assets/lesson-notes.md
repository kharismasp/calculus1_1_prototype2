# Calculus I — Lesson 01
## Functions: Meaning, Structure, and Models

*Undergraduate Mathematics · Complete English-language content master · Revised edition (23 November 2026)*

**Source alignment.** The scope follows *微分積分学 IAB*, Meeting 01, “基本的な関数” (Basic Functions), from the supplied `Doc_01/Doc_01.tex`. The binomial-coefficient assessment comes from the supplied `Tests/02/Test-02.tex` (16 April 2026). Standard supporting references include Strang, Stewart, OpenStax *Calculus Volume 1*, and Lang; the source map appears at the end.

**Central question**

> What do we need to know about a function before we can analyze how it changes?

**The main mathematical thread.** A function carries information about its inputs, outputs, and assignment rule. When we simplify, compose, or invert functions, we must preserve the conditions that make those operations meaningful. This thread connects functions to limits, differentiation, and approximation later in the course.

### Learning outcomes

By the end of this unit, you should be able to:

1. Specify a function using its domain, codomain, and assignment rule; distinguish its range from its codomain.
2. Decide whether two formulas define the same function on their stated domains, and distinguish a restriction from an extension.
3. Determine real domains of rational expressions, radicals, logarithms, and compositions—and justify endpoint choices.
4. Explain how composition and inverse functions work, including the roles of injectivity and surjectivity.
5. Identify the structures of polynomial, rational, power, exponential, logarithmic, and trigonometric functions, including appropriate domains.
6. Derive selected function identities and the finite binomial theorem, stating assumptions rather than applying formulas blindly.
7. Select and explain a solution strategy for problems requiring more than direct substitution.
8. Describe, without relying on formulas not yet established, how today's algebra prepares the study of limits and derivatives.

### How to use this content

This is a **complete learning unit**, not a script to rush through word for word in one 90-minute class. The main exposition is organized as one continuous explanation. Questions, proofs, and carefully chosen worked examples are integral to it. Additional explorations, exercises, full solutions, and an identity reference remain available in the same site, without separate lecturer or student modes.

A reasonable 90-minute live route is approximately: opening and roadmap (8 min), functions and domains (20 min), composition and inverse ideas (15 min), elementary families (15 min), unit-circle foundations (10 min), binomial reasoning (17 min), and a closing connection (5 min). Longer derivations and further exercises enrich independent study or a follow-up session. **Do not sacrifice conceptual explanation simply to finish every subsection aloud.**

### Mathematical honesty

- **Proved here:** domain reasoning, basic inverse properties, selected algebraic and trigonometric identities, the finite binomial theorem, and exact difference-quotient manipulations.
- **Used as previously established:** real-number arithmetic, existence of principal roots, elementary Euclidean geometry, and standard properties of real exponentials and logarithms.
- **Not proved yet:** the rigorous constructions and limit properties that underpin real powers, the definition of a derivative, and the limiting steps needed for derivative rules. They will appear in later lessons.

This distinction matters: experiments and graphs can reveal patterns, but they cannot establish universal mathematical claims.

---

# 1. Start with a question calculus will answer

## 1.1 A simple model raises several questions

Suppose an object moves along a straight line. Its position, measured in metres, is described by

$$s(t)=t^2,\qquad t\geq0,$$

Here we work with the numerical values of time in seconds and position in metres. This is a mathematical model: we are **assuming** the position follows this rule on the stated time interval.

We can calculate the position immediately: $s(2)=4$ metres and $s(3)=9$ metres. Over that one-second interval, the average velocity is

$$\frac{s(3)-s(2)}{3-2}=5\text{ m/s}.$$

But what is the velocity **at time $t=2$**? A single position value does not tell us. We could compare positions over shorter intervals starting at $2$:

$$\frac{s(2+h)-s(2)}{h},\qquad h>0.$$

| Interval length $h$ (s) | Change in position (m) | Average velocity (m/s) |
| ---: | ---: | ---: |
| $1$ | $5$ | $5$ |
| $0.1$ | $0.41$ | $4.1$ |
| $0.01$ | $0.0401$ | $4.01$ |

The values appear to approach $4$. **What would it mean to prove that they approach $4$?** That is a question about limits; defining instantaneous velocity will then lead to derivatives. Later we will also ask how to approximate position over short intervals and how to recover changes in position from velocity—questions about approximation and integration.

We do not need those tools yet. Before studying how a function changes, we must understand what the function actually specifies.

**Think first.** Is $s(-2)$ part of the motion model? The algebraic expression $(-2)^2$ is meaningful, but the model only declares $t\geq0$. This difference between an expression and a function with a stated domain will be central today.

**A second prediction.** If a time interval is halved, must the change in position be halved? Not for every position function. For constant velocity, equal time intervals produce proportional changes. Here the change depends on both the interval length and its starting time; we will calculate it exactly at the end.





## 1.2 Where the course is going

| Stage | Main question | Mathematical tools |
| --- | --- | --- |
| Functions | What relationship are we studying, and for which inputs? | Domains, elementary families, composition |
| Limits and continuity | What happens near a point? | Precise definitions, estimates, continuity theorems |
| Differentiation | How does an output change locally? | Derivatives, inverse-function and higher differentiation |
| Approximation | How can a simpler expression approximate a function, with controlled error? | Taylor's theorem |
| Integration | How do local contributions determine a total? | Definite integrals and integration methods |
| Applications and infinite processes | How does calculus describe geometry and convergence? | Area, arc length, improper integrals |

The source syllabus places elementary functions in Meeting 01; limits and continuity in 02; differentiation in 03–05; Taylor's theorem and L'Hôpital's rule in 06–07; a midterm in 08; integration in 09–13; applications and improper integrals in 14–15; and the final examination in 16.

The important point is not the sequence of chapter titles. It is that one function can be studied from several viewpoints: **what it assigns, what happens nearby, how it changes, and how those changes accumulate.**

# 2. A formula, its inputs, and its outputs

## 2.1 What makes a relationship a function?

**Motivating question.** If we choose an input, does the relationship determine exactly one output?

For $s(t)=t^2$ with $t\geq0$, each allowed time determines one position. The same output may occur at different inputs: what matters is that **each single input has exactly one output**.

**Definition.** A function $f:D\to B$ assigns to every $x\in D$ exactly one element $f(x)\in B$. The set $D$ is its **domain**, and $B$ is its **codomain**. Its **range** is

$$f(D)=\{f(x):x\in D\}.$$

The codomain declares the target set. The range records which target values are actually reached.

For example,

$$f:\mathbb R\to\mathbb R,\qquad f(x)=x^2$$

has range $[0,\infty)$. Negative real numbers belong to the codomain but are never outputs. The same assignment can instead be declared as a map $\mathbb R\to[0,\infty)$; it then reaches every element of its declared codomain.

A function is specified by its domain, codomain, and assignment. When we compare functions for equality below, we use the same codomain so that the role of the domain is completely clear.

**Check your reasoning.** Is $y^2=x$ a function of $x$ if the permitted output is any real number?

For $x>0$, it permits both $y=\sqrt{x}$ and $y=-\sqrt{x}$. For $x<0$, it permits no real output. It therefore does not define a function $\mathbb R\to\mathbb R$. Restricting inputs to $[0,\infty)$ and choosing the nonnegative output gives the function $x\mapsto\sqrt{x}$.

The symbol $\sqrt{\phantom{x}}$ denotes the **principal, nonnegative square root**. Solving $y^2=4$ gives $y=2$ and $y=-2$; evaluating $\sqrt4$ gives only $2$. This choice is what allows the square root to be a function.

## 2.2 A graph is a representation of a function

The graph of $f:D\to\mathbb R$ is

$$\{(x,f(x)):x\in D\}.$$

Every input in $D$ appears with exactly one output. This gives the vertical line test: a set of plotted points is the graph of a real-valued function on its projected domain precisely when no vertical line meets it more than once.

The circle $x^2+y^2=1$ fails this test as a relation between $x$ and $y$. Its upper half is the graph of $y=\sqrt{1-x^2}$ on $[-1,1]$.

A function can also be described by words, a table, a formula, a graph, or a piecewise rule. A table gives values at its listed inputs. Unless a rule or model is added, it does not determine what happens between those inputs. Different formulas can match every recorded value and disagree elsewhere.

**Connection.** Numerical data will often suggest a model. Choosing a model adds a mathematical assumption beyond the data themselves.

## 2.3 Find the domain before simplifying

When no domain is supplied, we will normally seek the largest set of real inputs for which the stated expression is defined. A model may impose further restrictions: $t^2$ makes algebraic sense for negative $t$, but our motion model starts at $t=0$.

Three restrictions recur:

- A denominator must be nonzero.
- The input to an even real root must be nonnegative.
- The input to a real logarithm must be strictly positive.

Apply these restrictions to the **actual operations** in an expression. Do not discard a point merely because a similar-looking expression would be undefined there.

**Worked example.** Determine the domain of

$$F(x)=\frac{\sqrt{x+1}}{x-2}.$$

The square root requires $x+1\geq0$, and the denominator requires $x\ne2$. Both conditions must hold:

$$\operatorname{dom}F=[-1,2)\cup(2,\infty).$$

At $x=-1$, the output is $0/(-3)=0$, so that endpoint is allowed. At $x=2$, the denominator is zero, so that input is excluded.

**Problem-solving method.** Identify every restricted operation, translate it into a condition, intersect the conditions, and check boundary values in the original expression.

## 2.4 Equality, restriction, and extension

Consider

$$r:\mathbb R\setminus\{1\}\to\mathbb R,
\qquad r(x)=\frac{x^2-1}{x-1},$$

and

$$\ell:\mathbb R\to\mathbb R,\qquad\ell(x)=x+1.$$

**Question.** Does cancelling the common factor make these the same function?

For $x\ne1$,

$$\frac{x^2-1}{x-1}
=\frac{(x-1)(x+1)}{x-1}=x+1.$$





The calculation establishes agreement at every input in the original domain. It does not assign a value to the original quotient at $1$.

**Equality criterion.** With the same declared codomain, two functions are equal if they have the same domain and the same value at every input in that domain.

Thus $r$ is the **restriction** of $\ell$ to $\mathbb R\setminus\{1\}$. Conversely, $\ell$ is an **extension** of $r$ to $\mathbb R$: it supplies the additional value $\ell(1)=2$.

There is no unique extension if we only ask for *a function*: we can assign any real number at $x=1$ and keep all other values unchanged. In Lesson 2, continuity will explain why assigning $2$ is special. We cannot reach that conclusion merely by cancelling factors.

**Explore.** Compare the two graphs and inspect $x=1$. What exactly changes when you simplify the quotient? Try assigning a value to the excluded input, and decide whether you have simplified the original function or defined an extension.

**Checkpoint — what carries forward?** We now know that algebraic agreement on a common set is not the same as equality of functions. The next step is to understand what restrictions survive when functions are combined or reversed.

---

# 3. Building functions and reversing them

## 3.1 Composition: follow the input through both functions

Let $f$ and $g$ be real functions. Their composition is

$$ (f\circ g)(x)=f(g(x)).$$

We first apply $g$, then apply $f$ to the result. Therefore,

$$\operatorname{dom}(f\circ g)
=\{x\in\operatorname{dom}g:g(x)\in\operatorname{dom}f\}.$$

**Why this is the domain.** The first condition makes the inner output exist. The second condition makes that output a permitted input for the outer function. Together they are exactly what is needed to evaluate $f(g(x))$.

**Worked comparison.** Let $f(u)=\sqrt{u}$ on $[0,\infty)$ and $g(x)=1-x^2$ on $\mathbb R$.

Then

$$ (f\circ g)(x)=\sqrt{1-x^2},
\qquad\operatorname{dom}(f\circ g)=[-1,1].$$

In the opposite order,

$$ (g\circ f)(x)=1-(\sqrt{x})^2=1-x,
\qquad\operatorname{dom}(g\circ f)=[0,\infty).$$

The simplified formula $1-x$ can be evaluated on all of $\mathbb R$, but the original composition still requires $x\geq0$. This is the same information-preservation issue that appeared in cancellation.

Composition is generally not commutative: changing the order can change both the output and the domain.







## 3.2 A logarithmic composition with different endpoint behaviour

Compare

$$A(x)=\sqrt{4-x^2},\qquad B(x)=\ln(4-x^2).$$

For $A$, the condition is $4-x^2\geq0$, giving domain $[-2,2]$. Its outputs lie between $0$ and $2$, and every value in that interval is attained, so its range is $[0,2]$.

For $B$, the condition is $4-x^2>0$, giving domain $(-2,2)$. The inner expression takes every value in $(0,4]$, so the range of $B$ is $(-\infty,\ln4]$.

This uses the standard fact that $\ln$ is strictly increasing on $(0,\infty)$ and has range $\mathbb R$. We will explain its inverse relationship with the exponential function in Section 4.

**Endpoint question.** Why is $x=2$ allowed for $A$ and excluded for $B$?

At that input, the inner output is $0$. The real square root accepts $0$; the real logarithm does not.





## 3.3 When can a function be reversed?

**Question.** If we know the output, can we recover exactly one input?

For the square function on $\mathbb R$, the output $4$ comes from both $2$ and $-2$. Reversing the full relationship would not assign a unique answer.

**Definition.** A function is **injective**, or **one-to-one**, if

$$f(x_1)=f(x_2)\Longrightarrow x_1=x_2.$$

It is **surjective onto its codomain** if every element of that codomain is attained. It is **bijective** if both properties hold.

**Inverse-function statement.** If $f:D\to B$ is bijective, there is a unique inverse function $f^{-1}:B\to D$ characterized by

$$f^{-1}(f(x))=x\quad(x\in D),
\qquad f(f^{-1}(y))=y\quad(y\in B).$$

**Reason.** Surjectivity provides an input for each $y\in B$; injectivity makes that input unique. Define $f^{-1}(y)$ to be that input. The two identities follow from this definition. Any inverse must make the same assignment, so it is unique. Conversely, if these identities hold, the first gives injectivity and the second gives surjectivity.

A one-to-one function can always be inverted **on its range**, whether or not it is surjective onto a larger codomain. Surjectivity is what lets the inverse be defined on the *entire* declared codomain. This distinction prevents us from using the phrase “has an inverse” without saying where that inverse is defined.

The notation $f^{-1}$ denotes an inverse function. The reciprocal $1/f(x)$ is a different construction and requires $f(x)\ne0$.

## 3.4 Restricting the domain can make an inverse possible

Restrict the square function to

$$f:[0,\infty)\to[0,\infty),\qquad f(x)=x^2.$$

It is bijective, and its inverse is $f^{-1}(y)=\sqrt{y}$. Check both directions:

$$f(\sqrt{y})=y\quad(y\geq0),
\qquad\sqrt{f(x)}=\sqrt{x^2}=x\quad(x\geq0).$$

For arbitrary real $x$, however,

$$\sqrt{x^2}=|x|.$$

**Derivation.** The principal square root is nonnegative. If $x\geq0$, the nonnegative number whose square is $x^2$ is $x$. If $x<0$, that number is $-x$. These two cases define $|x|$.

This explains why a domain restriction is part of an inverse calculation. Restricting the square function to $(-\infty,0]$ instead produces the inverse $y\mapsto-\sqrt{y}$.

**A useful sufficient condition.** A strictly monotone function is injective. “Strictly increasing” means $x_1<x_2$ implies $f(x_1)<f(x_2)$; “strictly decreasing” reverses the output inequality.

**Proof.** Distinct inputs can be ordered. Strict monotonicity then gives distinct outputs, which is injectivity. No continuity assumption is needed for this conclusion. A merely nondecreasing function need not be injective; a constant function is a counterexample.





**Connection to later calculus.** The same deliberate choice of a one-to-one branch is needed for inverse trigonometric functions. When we later differentiate an inverse, both its domain and the chosen branch will matter.

**Checkpoint — what carries forward?** A composition must admit the input at *every stage*. An inverse requires unique recovery of the original input. Both are questions about the structure and domain of a function, not just symbolic manipulation.

---

# 4. Elementary families: recognize the structure

## 4.1 Polynomials, rational functions, and powers

A **polynomial** is a finite sum

$$P(x)=a_0+a_1x+\cdots+a_nx^n,$$

with nonnegative integer exponents and real coefficients. If $a_n\ne0$, its degree is $n$. A polynomial is defined on all real numbers. A constant polynomial is also defined everywhere; its constant term does not require evaluating a separate ambiguous expression $0^0$.

A **rational function** is a quotient $P(x)/Q(x)$ of polynomials, where $Q$ is not the zero polynomial. The displayed quotient requires $Q(x)\ne0$.

For example,

$$x+x^{-2}=\frac{x^3+1}{x^2},\qquad x\ne0,$$

is rational and is not a polynomial. Its negative power matters to both classification and domain.

A **power function** has a fixed exponent and a variable base, such as $x^2$, $x^{-1}$, or $x^{1/2}$. The natural real domain depends on the exponent:

| Example | Natural real domain | A feature to explain |
| --- | --- | --- |
| $x^2$ | $\mathbb R$ | Opposite inputs have the same output |
| $x^3$ | $\mathbb R$ | The sign of the input is preserved |
| $x^{-1}$ | $\mathbb R\setminus\{0\}$ | Zero is excluded by division |
| $x^{1/2}$ | $[0,\infty)$ | The principal even root is nonnegative |
| $x^{1/3}$ | $\mathbb R$ | An odd root permits negative inputs |

For a general real exponent, we work on $x>0$ unless an extension is specified. For positive real exponents, the usual real-power function also takes value $0$ at $x=0$. For negative exponents, zero is excluded. Negative bases require separate care; some rational powers are real there, but a general real power is not defined there under the usual real-valued convention.

**Accepted result about real powers.** Positive-base rational powers extend to real exponents, with the usual exponent laws. The construction and its justification use limits and properties of the real numbers. We use the resulting functions here; a finite decimal table is not their definition.

For $a>0$ and real $p,q$,

$$a^p a^q=a^{p+q},\qquad
\frac{a^p}{a^q}=a^{p-q},\qquad
(a^p)^q=a^{pq}.$$

The positive-base assumption is a safe common setting for these general real-exponent identities. Dropping it indiscriminately can give false conclusions, as the example $\sqrt{x^2}=|x|$ already shows.

## 4.2 Power growth and exponential growth describe different structures

An **exponential function** has a fixed positive base and a variable exponent:

$$E(x)=b^x,\qquad b>0,\quad b\ne1.$$

Its domain is $\mathbb R$ and its range is $(0,\infty)$. It is strictly increasing when $b>1$ and strictly decreasing when $0<b<1$. These are standard properties of the real exponential, accepted here with the real-power construction.

The exponent law gives

$$E(x+h)=b^hE(x).$$

**The structural difference.** For an exponential, adding the same amount to the input multiplies the output by the same positive factor. For an affine function, adding the same amount to the input adds the same amount to the output. This is a difference in the functions' algebra—not a conclusion inferred from a graph.

For $L(x)=3x+2$,

$$L(x+h)-L(x)=3h.$$

For $P(x)=x^2$,

$$P(x+h)-P(x)=2xh+h^2.$$

The last change depends on the starting input $x$. These exact calculations distinguish additive change, power behaviour, and exponential scaling before derivatives are introduced.

**Check the claim.** Is $2^x>x^2$ for every $x>0$? At $x=3$, $8<9$, so the claim is false. An eventual-growth claim is different: it concerns **all sufficiently large** inputs, not all positive inputs. We will develop the tools for such statements when studying limits.





## 4.3 Logarithms recover an exponent

For $b>0$, $b\ne1$, the real exponential is a bijection from $\mathbb R$ to $(0,\infty)$. Its inverse is the logarithm:

$$\log_b:(0,\infty)\to\mathbb R,
\qquad \log_b y=x\ \Longleftrightarrow\ b^x=y.$$

**Motivating question.** If a quantity follows an exponential model and we know the output, how can we determine the input?

For instance, $2^x=8$ gives $x=3$. For $2^x=7$, the exact answer is $x=\log_2 7$. A logarithm names the exponent we need.

The inverse identities, with their domains, are

$$\log_b(b^x)=x\quad(x\in\mathbb R),
\qquad b^{\log_b y}=y\quad(y>0).$$

We use $\ln$ for the natural logarithm, whose base is the number $e\approx2.71828$. The supplied Japanese handout uses $\log$ for this same natural logarithm. The sequence definition of $e$ and its convergence belong to the next lesson; its existence is not proved by quoting its decimal digits.

## 4.4 Derive the logarithm laws from the inverse relationship

**Theorem.** For $u,v>0$, $r\in\mathbb R$, and an admissible base $b$,

$$\log_b(uv)=\log_b u+\log_b v,$$

$$\log_b(u/v)=\log_b u-\log_b v,$$

$$\log_b(u^r)=r\log_b u.$$

For another base $c>0$, $c\ne1$,

$$\log_b u=\frac{\log_c u}{\log_c b}.$$

**Product law.** Set $p=\log_b u$ and $q=\log_b v$. Then $u=b^p$ and $v=b^q$, so $uv=b^{p+q}$. Applying the inverse logarithm gives $\log_b(uv)=p+q$.

**Quotient and power laws.** The same argument uses $u/v=b^{p-q}$ and $u^r=(b^p)^r=b^{pr}$.

**Change of base.** If $z=\log_b u$, then $u=b^z$. Applying $\log_c$ gives $\log_c u=z\log_c b$. The denominator is nonzero because $b\ne1$.

These laws transform products into sums and powers into factors. Later, logarithmic differentiation will use exactly that change of structure.

**Worked domain check.** For $x\ne0$, $x^2=|x|^2$ and $|x|>0$, so

$$\ln(x^2)=\ln(|x|^2)=2\ln|x|.$$

The expression $2\ln x$ is defined only for $x>0$. A logarithm law cannot be applied to an input outside the domain of the logarithm appearing in that law.

There is no corresponding general sum law. Taking $u=v=1$ would give the false claim $\ln2=\ln1+\ln1=0$.

**Reasoning check.** Compare these statements:

1. $\ln(x^2)=2\ln x$ for every $x\ne0$.
2. $\ln(x^2)=2\ln|x|$ for every $x\ne0$.
3. $\ln(x+y)=\ln x+\ln y$ for every $x,y>0$.

For each one, determine whether both sides are defined and whether the claimed equality is true. If it fails, give either a corrected domain or a counterexample. A counterexample must use inputs for which **both sides exist**.





**Checkpoint — what carries forward?** Recognizing the operation—power, exponential, or logarithm—tells us how its inputs and outputs behave. This will guide domain checks and later derivative methods.

---

# 5. Trigonometry: from rotation to a function

## 5.1 Why radians belong naturally in calculus

**Question.** How can an angle be measured using the geometry of the circle itself?

For a circle of radius $r>0$, the radian measure of an angle is $\theta=s/r$, where $s$ is the signed arc length measured from a reference direction. On the unit circle, this becomes $s=\theta$. A full counterclockwise turn is $2\pi$ radians; clockwise motion corresponds to negative angles.

Why use radians? Because they measure angles directly through length. Later, this choice makes the trigonometric limit $\sin h/h$ take the fundamental value $1$ when $h\to0$, with no degree-conversion factor.

For an angle $\theta$, let the corresponding point on the unit circle have coordinates

$$P(\theta)=(\cos\theta,\sin\theta).$$

Both coordinate functions have domain $\mathbb R$ and range $[-1,1]$. The same point is reached after an additional full turn, so

$$\sin(\theta+2\pi)=\sin\theta,\qquad
\cos(\theta+2\pi)=\cos\theta.$$

A positive number $T$ is a period of a function on $\mathbb R$ when $f(x+T)=f(x)$ for every real $x$. The smallest positive period, if there is one, is its fundamental period. For sine, any period must satisfy $\sin T=0$ by taking $x=0$, and $\cos T=1$ by taking $x=\pi/2$. These conditions require $T$ to be a positive integer multiple of $2\pi$, so the fundamental period is $2\pi$. The corresponding unit-circle argument gives the same fundamental period for cosine.

The circle equation gives the identity

$$\sin^2\theta+\cos^2\theta=1.$$

Reflection across the horizontal axis gives $\cos(-\theta)=\cos\theta$ and $\sin(-\theta)=-\sin\theta$. Reflecting and then rotating by a quarter-turn gives $\cos(\pi/2-\theta)=\sin\theta$ and $\sin(\pi/2-\theta)=\cos\theta$.

A few exact values come from simple geometry:

| $\theta$ | $0$ | $\pi/6$ | $\pi/4$ | $\pi/3$ | $\pi/2$ |
| --- | --- | --- | --- | --- | --- |
| $\sin\theta$ | $0$ | $1/2$ | $\sqrt2/2$ | $\sqrt3/2$ | $1$ |
| $\cos\theta$ | $1$ | $\sqrt3/2$ | $\sqrt2/2$ | $1/2$ | $0$ |

Halving an equilateral triangle of side $2$ gives a right triangle with sides $1,\sqrt3,2$, producing the $\pi/6$ and $\pi/3$ values. An isosceles right triangle with legs $1,1$ has hypotenuse $\sqrt2$, giving the $\pi/4$ values. The axis points give the values at $0$ and $\pi/2$.

The tangent function is

$$\tan\theta=\frac{\sin\theta}{\cos\theta},\qquad
\theta\ne\frac\pi2+k\pi\ (k\in\mathbb Z).$$

For example, $\tan(\pi/2)$ is undefined. A very large finite value shown by a calculator near that angle is a numerical approximation at a nearby input, not its value at the excluded input.

Tangent repeats after $\pi$, because an additional half-turn changes the signs of both coordinates and leaves their ratio unchanged. Its range is all of $\mathbb R$: for any real slope $m$, the unit-circle point $(1,m)/\sqrt{1+m^2}$ has the ratio of vertical to horizontal coordinate equal to $m$.

**Explore.** Move a point on the unit circle and follow its horizontal and vertical coordinates as functions of the angle. Before reflecting the point across the horizontal axis, predict which coordinate will change sign. Notice that the circle itself is not the graph of $y=f(x)$; the sine and cosine graphs use **angle** as their input.

**Prediction prompt.** Where does the circle point go when $\theta$ becomes $-\theta$? Predict which coordinate changes sign before moving the point.





## 5.2 A geometric derivation of the addition identities

Take two unit-circle points

$$P=(\cos u,\sin u),\qquad Q=(\cos v,\sin v).$$

Their squared distance is

$$\begin{aligned}
|P-Q|^2
&=(\cos u-\cos v)^2+(\sin u-\sin v)^2\\
&=2-2(\cos u\cos v+\sin u\sin v).
\end{aligned}$$

Rotate both points through angle $-v$. A rotation preserves distance. The new points are $(\cos(u-v),\sin(u-v))$ and $(1,0)$, whose squared distance is

$$2-2\cos(u-v).$$

Equating the two expressions proves

$$\cos(u-v)=\cos u\cos v+\sin u\sin v.$$

Replacing $v$ with $-v$ and using the reflection identities gives

$$\cos(u+v)=\cos u\cos v-\sin u\sin v.$$

For sine, use the quarter-turn identity and the cosine difference formula:

$$\begin{aligned}
\sin(u+v)
&=\cos((\pi/2-u)-v)\\
&=\sin u\cos v+\cos u\sin v.
\end{aligned}$$

Replacing $v$ with $-v$ gives the sine difference formula.





**What the derivation used.** The unit-circle definitions, the Pythagorean identity, elementary reflection and rotation geometry, and algebra. It did not use trigonometric derivatives.

**Why it matters.** The addition identities describe how function values respond to an added input. That structure will be used when a derivative compares a value at $x+h$ with a value at $x$.

## 5.3 Recover useful identities instead of treating each as a new fact

Setting $v=u$ gives

$$\sin2u=2\sin u\cos u,$$

$$\cos2u=\cos^2u-\sin^2u
=1-2\sin^2u=2\cos^2u-1.$$

Rearrange these to obtain

$$\sin^2u=\frac{1-\cos2u}{2},\qquad
\cos^2u=\frac{1+\cos2u}{2}.$$

These power-reduction identities will simplify integrals involving $\sin^2u$ and $\cos^2u$.

Adding the sine addition and subtraction formulas gives

$$\sin(u+v)+\sin(u-v)=2\sin u\cos v.$$

Writing $A=u+v$, $B=u-v$ therefore yields

$$\sin A+\sin B
=2\sin\frac{A+B}{2}\cos\frac{A-B}{2}.$$

One small collection of geometric facts has now produced formulas for addition, doubling, reducing powers, and turning sums into products.

**Misconception check.** The half-angle formula gives

$$\left|\sin\frac\theta2\right|
=\sqrt{\frac{1-\cos\theta}{2}}.$$

Removing the absolute value requires knowing the sign of $\sin(\theta/2)$. Taking a principal square root is the same issue we encountered in $\sqrt{x^2}=|x|$.

## 5.4 A periodic model with interpretable parameters

Consider the illustrative height model

$$H(t)=12+3\sin\left(\frac{\pi t}{6}\right),
\qquad0\leq t\leq24,$$

where $t$ is the numerical time in hours and $H$ is measured in a specified height unit. This formula is an example for analysis, not a fit to measured data.

The middle level is $12$. The output moves at most $3$ units above or below it, so the amplitude is $3$ and the range is $[9,15]$.

A full cycle occurs when the inner angle increases by $2\pi$. Thus

$$\frac\pi6T=2\pi\quad\Longrightarrow\quad T=12\text{ hours}.$$

The model completes two cycles over the displayed day. Its first maximum is at $t=3$, since the angle is then $\pi/2$; its first minimum is at $t=9$.

**Parameter connection.** For $A\ne0$ and $\omega>0$,

$$m+A\sin(\omega(t-t_0))$$

has middle level $m$, amplitude $|A|$, and fundamental period $2\pi/\omega$ on the full real line. Restricting the observation interval may show less than a full cycle, so its observed range need not contain both extremes.

**Explore.** Before changing $\omega$ to $2\omega$, predict the time required for one complete cycle. Check the graph, then justify your prediction from the amount by which the input angle must increase. If $A=0$, the function is constant and has no **smallest** positive period.





**Checkpoint — what carries forward?** The unit circle explains periodic functions and lets us *derive* identities. Addition formulas will return when we study trigonometric limits and derivatives; power-reduction identities will return in integration.

---

# 6. The binomial theorem: find the structure you need

## 6.1 Why the coefficients count choices

**Question.** When expanding $(U+V)^n$, how many ways can a term containing exactly $k$ copies of $V$ appear?

The expression is a product of $n$ identical factors. Each contribution comes from choosing either $U$ or $V$ in each factor. To obtain $U^{n-k}V^k$, choose which $k$ of the $n$ factors contribute $V$.

There are

$$\binom nk=\frac{n!}{k!(n-k)!}$$

such choices. The factorial denominator removes the orderings that do not change the selected subset. Here $0!=1$.

**Finite binomial theorem.** For an integer $n\geq0$,

$$ (U+V)^n=\sum_{k=0}^n\binom nkU^{n-k}V^k.$$

The counting argument proves the identity for positive $n$ by the distributive law. For $n=0$, the statement is the constant-polynomial identity $1=1$.

The exponent condition matters: a noninteger exponent does not generally produce this finite expansion. Infinite binomial expansions will require separate convergence conditions later.

**Small example.** In $(U+V)^3$, there are three ways to choose exactly one $V$ and three ways to choose exactly two. Hence

$$ (U+V)^3=U^3+3U^2V+3UV^2+V^3.$$

## 6.2 A source problem: select one term, not the whole expansion

**Problem.** Find the coefficient of $x^{-4}$ in

$$\left(3x^2-\frac1{x^3}\right)^8.$$

This is Test 02, Question 1, in the supplied course archive. The expression is defined for $x\ne0$ and expands into a finite sum of integer powers, including negative powers.

**Choosing a method.** We need one coefficient. Track the power of $x$ in the general term before calculating its numerical coefficient.

Choose $k$ copies of $-x^{-3}$ and $8-k$ copies of $3x^2$. The term is

$$\begin{aligned}
\binom8k(3x^2)^{8-k}(-x^{-3})^k
&=\binom8k3^{8-k}(-1)^k x^{2(8-k)-3k}\\
&=\binom8k3^{8-k}(-1)^k x^{16-5k}.
\end{aligned}$$

For the required power,

$$16-5k=-4\quad\Longrightarrow\quad k=4.$$

This is an allowed integer between $0$ and $8$. The coefficient is therefore

$$\binom{8}{4}3^4(-1)^4=70\cdot81=5670.$$

**Transfer question.** Could an $x^{-3}$ term occur in the same expansion?

It would require $16-5k=-3$, or $k=19/5$. Such a term cannot occur because $k$ must count a whole number of selected factors. No full expansion is needed.

**Explore.** Choose a term index $k$ and predict the exponent of $x$ before seeing its coefficient. What would tell you immediately that a requested power cannot appear in this expansion?





## 6.3 Why this algebra will matter in differentiation

The binomial theorem also explains the structure of a derivative formula. For an integer $n\geq1$,

$$(x+h)^n=x^n+nx^{n-1}h+\sum_{k=2}^n\binom nk x^{n-k}h^k.$$

For $h\ne0$, subtract $x^n$ and divide by $h$:

$$\frac{(x+h)^n-x^n}{h}
=nx^{n-1}+\sum_{k=2}^n\binom nk x^{n-k}h^{k-1}.$$

When $n=1$, the sum is empty and equals zero. The right-hand expression is a polynomial in $h$ and has value $nx^{n-1}$ at $h=0$, but the **original quotient** remains undefined there.

We have already seen this distinction in simplifying rational expressions: agreement away from an excluded input does not automatically assign a value at that input. In Lesson 2 we will define limits; later, the definition of derivative and the limit laws will justify the power rule for positive integer powers. The coefficient $n$ comes from the $k=1$ term, not from an unexplained pattern.

**A deliberate misconception to challenge.** A simplified difference quotient may have a well-defined polynomial expression at $h=0$. This does **not** mean the original quotient is defined there. We will use the limit concept—not an illicit substitution—to handle this distinction.

**Checkpoint — what carries forward?** A combinatorial argument can reveal the exact term we need. In calculus, the same binomial expansion isolates the part of an expression that depends linearly on a small change $h$.

---

# 7. Return to the opening motion

Return to the question at the beginning. For $s(t)=t^2$, algebra alone gives

$$s(2+h)=(2+h)^2=4+4h+h^2.$$

The exact change in position from time $2$ is $4h+h^2$. The simpler approximation $4h$ has exact numerical error $h^2$ in metres, with $h$ measured numerically in seconds. We have **computed** this error; we have not yet established a general approximation theorem.

For example, at $h=0.1$ the exact change is $0.41$, while the linear prediction is $0.4$. At $h=0.01$, these are $0.0401$ and $0.04$.

For $h\ne0$ and $2+h\geq0$,

$$\frac{s(2+h)-s(2)}{h}=4+h.$$

For sufficiently small positive or negative $h$, both times $2$ and $2+h$ lie in the model domain. The average-velocity quotient is undefined at $h=0$, even though the polynomial expression $4+h$ is defined there. Next lesson, a **limit** will explain precisely why $4$ describes its nearby behavior.





**Closing explanation.**

> We began by asking about motion. To prepare an answer, we had to keep track of the allowed times, build a new function from position values, and simplify it without losing its excluded input. The binomial theorem exposed the part proportional to the interval length and the remaining error. These are the ingredients from which limits, derivatives, and local approximation will grow.

**Exit questions.**

1. What information can be lost if we simplify an expression and then forget its original domain?
2. Why does an inverse calculation need a uniqueness condition?
3. What did the binomial theorem reveal about the average-change quotient?

# 8. Practice: interpretation, reasoning, and transfer

These ten problems are arranged to develop **interpretation → domain reasoning → inverse structure → modelling → strategic algebra → synthesis**. They are a bank for discussion and independent work, **not** ten obligatory questions to finish in one class. Problems 11–12 are optional extensions. Each problem includes strategy-oriented hints and a complete mathematical solution. The original course-bank problem is identified explicitly; the other problems are newly authored.

## Problem 1. What does a table determine?

A position table gives $s(0)=0$, $s(1)=1$, and $s(2)=4$.

**(a)** Does the table alone establish that $s(t)=t^2$ for all $t\geq0$? **(b)** Find another polynomial that agrees with all three entries. **(c)** What additional statement turns $t^2$ into a model for intermediate times?

**Hint 1.** What would the difference between two matching models have to do at the recorded inputs?

**Hint 2.** Consider $t(t-1)(t-2)$.

**Solution.** The table specifies only three inputs. For instance,

$$p(t)=t^2+t(t-1)(t-2)$$

has the same values there, but $p(1/2)=5/8$, whereas $(1/2)^2=1/4$. Stating that the position follows the rule $s(t)=t^2$ throughout the intended interval supplies the model assumption. Three matching samples do not prove that extension.

**Purpose.** Distinguish a representation at finitely many inputs from a claim about a full domain.

## Problem 2. Simplification and equality

Let $r(x)=(x^2-1)/(x-1)$ on its natural domain, and let $\ell(x)=x+1$ on $\mathbb R$.

**(a)** State each domain. **(b)** State precisely where the values agree. **(c)** Describe how $\ell$ is related to $r$. **(d)** Can a different function extend $r$ to $\mathbb R$?

**Hint 1.** Keep the original denominator condition throughout the calculation.

**Hint 2.** An extension only has to preserve the original outputs; it must also assign a value at the new input.

**Solution.** Their domains are $\mathbb R\setminus\{1\}$ and $\mathbb R$. Factoring proves $r(x)=\ell(x)$ for every $x\ne1$. Thus $r$ is the restriction of $\ell$ to the smaller domain, and $\ell$ is an extension of $r$. Assigning $r(1)=c$ for any real $c$, while retaining the original rule elsewhere, defines another extension. Only the assignment $c=2$ gives $\ell$ itself. The original quotient has not thereby acquired a value automatically.

**Purpose.** Separate algebraic agreement, function equality, and extension.

## Problem 3. Read a composition from the outside inward

Find the real domains of

$$A(x)=\sqrt{4-x^2},\quad
B(x)=\ln(4-x^2),\quad
C(x)=\sqrt{\ln(4-x^2)}.$$

Find the ranges of $A$ and $B$, and explain the endpoint choices.

**Hint 1.** What inputs does each outer function accept?

**Hint 2.** For $C$, the logarithm must exist and its output must be nonnegative. Use the fact that $\ln$ is increasing and $\ln1=0$.

**Solution.** The domains of $A$ and $B$ are $[-2,2]$ and $(-2,2)$ respectively. Their ranges are $[0,2]$ and $(-\infty,\ln4]$. For $C$, we require $\ln(4-x^2)\geq0$, which is equivalent to $4-x^2\geq1$. This condition also ensures a positive input to the logarithm. Hence

$$\operatorname{dom}C=[-\sqrt3,\sqrt3].$$

At those endpoints the logarithm equals zero, and its square root is defined.

**Purpose.** Combine restrictions rather than apply only the innermost one.

## Problem 4. Change the order, then check the domain

Let $f(u)=\sqrt u$ on $[0,\infty)$ and $g(x)=1-x^2$ on $\mathbb R$.

Find $f\circ g$ and $g\circ f$, including their domains. A proposed solution gives $g\circ f=1-x$ on all real numbers. Explain the error.

**Hint 1.** Trace the input through the inner function before simplifying.

**Hint 2.** Can the original inner function be evaluated at $x=-1$?

**Solution.** The first composition is $\sqrt{1-x^2}$ on $[-1,1]$. The second is $1-x$ on $[0,\infty)$, because the inner square root requires $x\geq0$. Extending the simplified formula to negative inputs defines a larger function; it does not describe the original composition on those inputs.

**Purpose.** Transfer the information-preservation principle to a different operation.

## Problem 5. Reverse a shifted square

Consider $f(x)=(x-2)^2$.

**(a)** Explain why $f:\mathbb R\to[0,\infty)$ is not invertible. **(b)** Restrict the domain to $[2,\infty)$ and find the inverse onto that domain. Check both inverse identities. **(c)** What inverse is obtained from the restriction $(-\infty,2]$?

**Hint 1.** Compare inputs equally far from $2$.

**Hint 2.** The sign of $x-2$ is determined by the chosen interval.

**Solution.** The inputs $1$ and $3$ both give $1$, so the unrestricted function is not injective. On $[2,\infty)$, solving $y=(x-2)^2$ with $x-2\geq0$ gives

$$f^{-1}(y)=2+\sqrt y,\qquad y\geq0.$$

For $x\geq2$, $2+\sqrt{(x-2)^2}=2+|x-2|=x$. For $y\geq0$, $(2+\sqrt y-2)^2=y$. These verify both identities and show the stated inverse is valid. On $(-\infty,2]$, the inverse is $y\mapsto2-\sqrt y$, again for $y\geq0$.

**Purpose.** Make the branch choice a consequence of the domain.

## Problem 6. Exponential scaling and a recovered input

A proposed growth model is

$$Q(t)=80\left(\frac32\right)^{t/2},\qquad t\geq0,$$

with $t$ measured numerically in hours and $Q$ in a specified quantity unit.

**(a)** Find $Q(0)$ and $Q(2)$. **(b)** Show that $Q(t+2)=\tfrac32Q(t)$. **(c)** Find the exact time when the model reaches $200$. **(d)** Does the formula alone show that an actual measured process follows this model indefinitely?

**Hint 1.** How much does the exponent change when time increases by two hours?

**Hint 2.** To recover $t$ from an exponent, use a logarithm on positive quantities.

**Solution.** The initial values are $80$ and $120$. The exponent law gives

$$Q(t+2)=80(3/2)^{t/2+1}=(3/2)Q(t).$$

For $Q(t)=200$, divide by $80$ and take natural logarithms:

$$\frac t2\ln(3/2)=\ln(5/2),
\qquad t=\frac{2\ln(5/2)}{\ln(3/2)}\text{ hours}.$$

This value is positive, so it belongs to the model domain. The equation is mathematically well-defined for arbitrarily large $t$, but that alone does not establish its continued suitability for any actual process.

**Purpose.** Connect the multiplicative structure, inverse operation, units, and scope of a model.

## Problem 7. Decide the domain of an identity

For each claim, give the correct domain or provide a counterexample where both sides exist:

**(a)** $\sqrt{x^2}=x$. **(b)** $\ln(x^2)=2\ln x$. **(c)** $\ln(x+y)=\ln x+\ln y$. **(d)** $\ln(e^{2x-1})=2x-1$.

**Hint 1.** First distinguish “false” from “one side is undefined.”

**Hint 2.** Use $|x|$ in the first two claims, and test $x=y=1$ in the third.

**Solution.** (a) Both sides exist for all real $x$, but equality holds exactly when $x\geq0$; the identity valid on all real inputs is $\sqrt{x^2}=|x|$. (b) Both displayed sides exist when $x>0$, and equality holds there. On the larger domain $x\ne0$, the correct expression is $2\ln|x|$. (c) It fails even for positive inputs: $x=y=1$ gives $\ln2$ on the left and zero on the right. (d) It holds for every real $x$, since the exponential is always positive and $\ln$ is its inverse.

**Purpose.** Require a condition, a correction, or a legitimate counterexample rather than a bare true/false response.

## Problem 8. Interpret and use a periodic model

Let $H(t)=12+3\sin(\pi t/6)$ for $0\leq t\leq24$, with time in hours.

**(a)** State the middle level, amplitude, cycle length, and range. **(b)** Find all maximum and minimum times in the interval. **(c)** Find all times when $H(t)=13.5$. **(d)** If the inner coefficient changes to $\pi/3$, what happens to the cycle length?

**Hint 1.** Convert conditions on $H$ into conditions on the sine value.

**Hint 2.** In one turn, sine equals $1/2$ at angles $\pi/6$ and $5\pi/6$. Include all repeated cycles in the stated time domain.

**Solution.** The middle level is $12$, the amplitude $3$, the cycle length $12$ hours, and the range $[9,15]$. Maxima occur when $\pi t/6=\pi/2+2k\pi$, giving $t=3,15$. Minima give $t=9,21$. The target height requires $\sin(\pi t/6)=1/2$, hence $t=1+12k$ or $5+12k$. The permitted times are $1,5,13,17$ hours. Changing the coefficient to $\pi/3$ gives cycle length $6$ hours.

**Purpose.** Use unit-circle information, repeated cycles, and a restricted model domain together.

## Problem 9. Select a binomial term

Find the coefficient of $x^{-4}$ in $(3x^2-x^{-3})^8$. Then determine whether an $x^{-3}$ term occurs. This is the supplied Test 02, Question 1, followed by an original transfer part.

**Hint 1.** Write the general term using a consistent choice of $k$.

**Hint 2.** With $k$ counting the negative-power factors, the exponent is $16-5k$.

**Solution.** The derivation in Section 6 gives $k=4$ and coefficient $5670$. The proposed $x^{-3}$ term requires the noninteger value $19/5$ of $k$, so it does not occur. A reversed indexing convention gives the same conclusion when used consistently.

**Purpose.** Select the required structure efficiently and check that an index is admissible.

## Problem 10. Prepare an average-change quotient

For $h\ne0$, simplify

$$R(h)=\frac{(2+h)^4-16}{h}.$$

State its original domain. Give a polynomial extension to all real $h$, and identify the extension's value at $0$. Explain why the original quotient still has no value there.

**Hint 1.** Which term of the binomial expansion is removed by subtracting $16$?

**Hint 2.** After removing the constant term, factor $h$ out of every remaining term. Record where this factor can be cancelled.

**Solution.** Expansion gives

$$ (2+h)^4=16+32h+24h^2+8h^3+h^4.$$

Thus $R(h)=32+24h+8h^2+h^3$ for $h\ne0$. This polynomial defines an extension to $\mathbb R$, with value $32$ at zero. The original formula still divides by zero there; the added value is part of the extension. A limit will justify the special role of that extension in the next lesson.

**Purpose.** Bring domains, binomial structure, extension, and future differentiation into one problem.

## Further exploration 11. A missing solution after simplification

Let

$$J(x)=\ln\left(\frac{x^2-1}{x-1}\right)$$

on its natural real domain. Find the domain and solve $J(x)=\ln2$.

**Hint 1.** Keep the denominator restriction as well as the strict positivity condition for the logarithm.

**Hint 2.** After solving the simplified equation, check that its candidate belongs to the original domain.

**Solution.** For $x\ne1$, the inner quotient equals $x+1$. We therefore need $x>-1$ and $x\ne1$, giving

$$\operatorname{dom}J=(-1,1)\cup(1,\infty).$$

Injectivity of $\ln$ turns $\ln(x+1)=\ln2$ into $x=1$. That input is excluded, so the original equation has no solution. The simplified expression defines a larger function unless its original domain is retained.

**Purpose.** Test whether the central principle transfers to a multistep equation.

## Further exploration 12. Order under composition

Let $I,J$ be real intervals, let $g:J\to I$, and let $f:I\to\mathbb R$. Prove that $f\circ g$ is strictly increasing if both $f$ and $g$ are strictly increasing. What happens if both are strictly decreasing?

**Hint 1.** Start with two ordered inputs in $J$.

**Hint 2.** Track the direction of the inequality after each function is applied.

**Solution.** For $x_1<x_2$, increasing $g$ gives $g(x_1)<g(x_2)$. Increasing $f$ then gives $f(g(x_1))<f(g(x_2))$. If both functions decrease strictly, the first inequality reverses: $g(x_1)>g(x_2)$. Applying decreasing $f$ reverses it again, giving $f(g(x_1))<f(g(x_2))$. In both cases the composition is strictly increasing. The assumption $g(J)\subseteq I$ ensures the composition exists on all of $J$.

**Purpose.** Build a short proof directly from definitions, with explicit domain compatibility.

# 10. Trigonometric identity reference (supporting material)

This reference is available when needed; it is not a list to memorize during the first meeting. The main narrative derives the addition, double-angle, power-reduction, and one sum-to-product identity. The remaining identities below follow by the same addition formulas and algebra.

## 10.1 Pythagorean and reciprocal identities

$$\sin^2x+\cos^2x=1.$$

Where the denominators are nonzero,

$$\tan x=\frac{\sin x}{\cos x},\quad
\sec x=\frac1{\cos x},\quad
\csc x=\frac1{\sin x},\quad
\cot x=\frac{\cos x}{\sin x},$$

$$1+\tan^2x=\sec^2x,\qquad1+\cot^2x=\csc^2x.$$

The last two identities follow by dividing the first identity by $\cos^2x$ or $\sin^2x$ respectively, on the corresponding domains.

## 10.2 Addition and subtraction

$$\sin(u\pm v)=\sin u\cos v\pm\cos u\sin v,$$

$$\cos(u\pm v)=\cos u\cos v\mp\sin u\sin v.$$

Where every tangent appearing in the formula is defined and its displayed denominator is nonzero,

$$\tan(u\pm v)=\frac{\tan u\pm\tan v}{1\mp\tan u\tan v}.$$

To derive the tangent formula, divide the appropriate sine addition formula by the cosine addition formula, then divide numerator and denominator by $\cos u\cos v$. This calculation requires all denominators used in it to be nonzero.

## 10.3 Double, half, and triple angles

$$\sin2x=2\sin x\cos x,$$

$$\cos2x=\cos^2x-\sin^2x=2\cos^2x-1=1-2\sin^2x,$$

$$\sin^2\frac x2=\frac{1-\cos x}{2},\qquad
\cos^2\frac x2=\frac{1+\cos x}{2},$$

$$\sin3x=3\sin x-4\sin^3x,\qquad
\cos3x=4\cos^3x-3\cos x.$$

The triple-angle formulas follow by applying the addition identities to $2x+x$, then using the double-angle and Pythagorean identities. The tangent versions, where defined, are

$$\tan2x=\frac{2\tan x}{1-\tan^2x},\qquad
\tan3x=\frac{3\tan x-\tan^3x}{1-3\tan^2x}.$$

The half-angle formulas determine squares. A square root requires a separate sign choice.

## 10.4 Products and sums

$$\sin u\cos v=\tfrac12[\sin(u+v)+\sin(u-v)],$$

$$\cos u\cos v=\tfrac12[\cos(u+v)+\cos(u-v)],$$

$$\sin u\sin v=\tfrac12[\cos(u-v)-\cos(u+v)].$$

These follow by adding or subtracting the corresponding addition formulas. The inverse conversions are

$$\sin u+\sin v=2\sin\frac{u+v}{2}\cos\frac{u-v}{2},$$

$$\sin u-\sin v=2\cos\frac{u+v}{2}\sin\frac{u-v}{2},$$

$$\cos u+\cos v=2\cos\frac{u+v}{2}\cos\frac{u-v}{2},$$

$$\cos u-\cos v=-2\sin\frac{u+v}{2}\sin\frac{u-v}{2}.$$

The substitutions are $A=(u+v)/2$ and $B=(u-v)/2$, so that $A+B=u$ and $A-B=v$.

## 10.5 Combine sine and cosine into one shifted wave

If $a,b\in\mathbb R$ are not both zero, set $R=\sqrt{a^2+b^2}>0$. Choose $\phi$ with

$$\cos\phi=\frac aR,\qquad\sin\phi=\frac bR.$$

Such an angle exists because the two right-hand values lie on the unit circle. The sine addition formula gives

$$a\sin x+b\cos x=R\sin(x+\phi).$$

If $a=b=0$, the expression is the constant zero function and no division by $R$ is needed. This identity explains how two oscillatory contributions with the same frequency can be described by one amplitude and phase.

# 11. Source map, dependencies, and editorial checks

## 11.1 What has been justified here

| Statement | Status in this unit |
| --- | --- |
| Domain of a composition | Derived from successive evaluation |
| Cancellation preserves agreement only where the original quotient exists | Established by factorization with its nonzero condition |
| Existence and uniqueness of an inverse for a bijection | Proved from existence and uniqueness of preimages |
| Strict monotonicity implies injectivity | Proved directly from the definition |
| $\sqrt{x^2}=|x|$ | Derived by the sign cases |
| Logarithm laws | Derived from the accepted real-exponent laws and inverse relationship |
| Sine and cosine addition formulas | Derived geometrically using distance preservation |
| Selected related trigonometric identities | Derived from the addition formulas; reference variants supplied |
| Finite binomial theorem | Proved by counting choices in the product expansion |
| Average-change and approximation identities for the opening motion | Calculated exactly |

The standard existence and elementary properties of real roots and positive-base real powers are accepted at this point. In particular, the exponential's monotonicity and range are accepted results of that construction. Elementary Euclidean facts about rotations, distance, and the circle are also used. The lesson does not pretend that numerical exploration proves these existence results.

Limits, continuity, trigonometric derivatives, and L'Hopital's rule are not used as unproved tools in the derivations above. The limit and derivative connections are explicitly previews.

## 11.2 Primary supplied references

The exposition, teaching questions, and exercises (apart from the identified quiz problem) are an original synthesis, not copied textbook passages. The source syllabus determines the **course scope**; the other references support the mathematical definitions, derivations, and pedagogy. This unit retains the original single-variable course sequence while giving explicit proof status to results used before limits are developed.

| Reference | Specific material supporting this unit |
| --- | --- |
| Supplied Calculus_Iab/Doc_01/Doc_01.pdf, PDF p. 2; elementary-function material on PDF pp. 3–6 | Active syllabus, elementary powers, exponential and logarithmic functions, trigonometric identities, binomial task |
| Supplied Calculus_Iab/Tests/02/Test-02.tex and Test-02a.tex, Question 1 | Exact coefficient problem and source answer $5670$ |
| Gilbert Strang, Calculus, third-edition supplied file calculus gilbert strang1.pdf, §1.1, printed pp. 51–53 (PDF pp. 64–66) | Motion and the relationship between position and velocity as a big-picture introduction |
| Same Strang reference, §1.5, printed pp. 80–81 (PDF pp. 93–94), and §2.2, printed pp. 94–95 (PDF pp. 107–108) | Unit-circle trigonometry and radians; binomial structure leading toward power differentiation |
| James Stewart, Calculus: Early Transcendentals, 8th ed., §§1.1–1.5 | Functions and representations, elementary families, composition, positive-base exponent laws, inverses and logarithms |
| Same Stewart reference, §1.3, printed p. 41 (PDF p. 73); §1.4, printed p. 47 (PDF p. 79); §1.5, printed pp. 56–60 (PDF pp. 88–92) | Domain of composition, exponent conditions, inverse identities, logarithm laws |
| OpenStax, Calculus Volume 1, senior contributing authors Edwin Herman and Gilbert Strang, §§1.1–1.5 | Functions and graphs, family classification, trigonometric functions, inverses, exponential and logarithmic functions |

The syllabus's named Takahashi–Kato textbook has not been verified as a supplied standalone volume. No chapter or page claims about its contents are made here.

## 11.3 Supplemental context

The inspected Oxford IB Applications and Interpretation HL (2019), §4.1, §7.3, and §8.2, supports possible graph interpretation and modelling activities. The inspected Hodder IB Analysis and Approaches HL (2019) introduction supports distinguishing a solution strategy from its written mathematical argument. These are supplementary references; they do not set this course's level or replace the university syllabus.

MIT's official pages provide direct access to the Strang resources:

- [OpenStax Calculus Volume 1, Chapter 1](https://openstax.org/books/calculus-volume-1/pages/1-introduction)
- [Gilbert Strang, The Core Ideas in Our Teaching](https://math.mit.edu/~gs/dela/core_ideas.pdf)
- [Highlights of Calculus](https://ocw.mit.edu/courses/res-18-005-highlights-of-calculus-spring-2010/)
- [Calculus Open Textbook: About the Book](https://ocw.mit.edu/courses/res-18-001-calculus-fall-2023/pages/about/)

The design adopts the broad priorities of connected ideas, clear examples, and an early view of what calculus can do. The exact explanations and interactions above are our own rather than an imitation of a particular lecture transcript.

## 11.4 Corrections retained when adapting the handout

The following local source issues have been checked rather than copied into the lesson:

- The handout groups $x+x^{-2}$ under a polynomial label. Standard terminology classifies it as rational and not polynomial.
- The handout's sum-to-product entry for $\cos x+\cos y$ repeats $(x+y)/2$ in both factors. The correct second factor is $\cos((x-y)/2)$.
- A negative base is not defined only at integer exponents: certain rational exponents also have real values. It does not, however, give the usual real exponential function on all of $\mathbb R$.
- A monotone function needs strict monotonicity to infer injectivity from that condition alone. The lesson states this distinction explicitly.

These corrections preserve the intended syllabus while keeping the English mathematical statements accurate.


---

