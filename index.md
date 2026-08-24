@def title = "Henry Hunt"
@def tags = ["syntax", "code"]

# Under construction, comeback latter

\newcommand{\E}[1]{\mathbb E\left[#1\right]}

$$\rho = \E{\ket{\psi}\bra{\psi}}$$

```julia:pyplot1
using PyPlot
PyPlot.ioff() #hide
figure(figsize=(8, 6))
x = range(-2, 2, length=500)
for α in 1:4
    plot(x, sinc.(α .* x))
end
savefig(joinpath(@OUTPUT, "sinc.svg")) # hide
```

\fig{sinc}